import { download, getFileSize, getHeaders, getTotalRows, parseCsv } from '../main';

test('getFileSize', () => {
    expect(getFileSize()).toBe(0);
});

test('getTotalRows', () => {
    expect(getTotalRows()).toBe(0);
});

test('parseCsv', () => {
    expect(parseCsv()).toBe('');
});

test('download', () => {
    download(() => {console.log("callback")});
});

test('getHeaders', () => {
    getHeaders();
});