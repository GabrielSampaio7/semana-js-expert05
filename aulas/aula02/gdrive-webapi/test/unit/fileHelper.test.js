import {
    describe,
    test,
    expect,
    jest
} from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'

import Routes from './../../src/routes.js'

describe('#FileHelper', () => {

    describe('#getFileStatus', () => {
        test('it should return files statuses in correct format', async () => {
            const statMock = {
                dev: 2197134738,
                mode: 33206,
                nlink: 1,
                uid: 0,
                gid: 0,
                rdev: 0,
                blksize: 4096,
                ino: 6192449487672461,
                size: 266465,
                blocks: 528,
                atimeMs: 1631139995061.9277,
                mtimeMs: 1631139994980,
                ctimeMs: 1631139994979.9272,
                birthtimeMs: 1631139951141.6152,
                atime: '2021-09-08T22:26:35.062Z',
                mtime: '2021-09-08T22:26:34.980Z',
                ctime: '2021-09-08T22:26:34.980Z',
                birthtime: '2021-09-08T22:25:51.142Z'
            }

            const mockUser = 'undefined'
            process.env.USER = mockUser
            const filename = 'file.png'

            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename])

            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)

            const result = await FileHelper.getFilesStatus("/tmp")

            const expectedResult = [
                {
                    size: "266 kB",
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)
        })
    })
})