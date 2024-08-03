# Question base object

```json
{
  "type": "lans",
  "title": "",
  "marks": 1,
  "options": []
}
```

### Question Object Keys

| Key       | Description                                                       | Type    |
| --------- | ----------------------------------------------------------------- | ------- |
| `type`    | Question Type                                                     | string  |
| `title`   | The title of the question                                         | string  |
| `marks`   | The marks to be awarded for a question                            | integer |
| `options` | Options to be provided for a question (which is of mcq/fitb type) | object  |

### Question Object Types

| Command    | Description                                             |
| ---------- | ------------------------------------------------------- |
| `ans`      | long/short answer                                       |
| `adash`    | answer with lines                                       |
| `mcq/fitb` | multiple choice question or fill in the blanks question |
