## Application that compares the content of two files (it doesn't consider replacements)

Main function accepts paths of two files and returns their differences

Core function and file reader tests:

```
npm run test
```

Main function returns data in a formated way:

```
1 - Some
2 - Simple
3 + Another
4   Text
5   File
6 + With
7 + Additional
8 + Lines
```

Though, core function might be used for getting raw data for further processing, which looks like the following:

```
    [ { sign: '-', data: 'Some' },
      { sign: '-', data: 'Simple' },
      { sign: '+', data: 'Another' },
      { sign: ' ', data: 'Text' },
      { sign: ' ', data: 'File' },
      { sign: '+', data: 'With' },
      { sign: '+', data: 'Additional' },
      { sign: '+', data: 'Lines' } ]
```
