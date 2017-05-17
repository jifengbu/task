## 目录
1. [登录(login)](#登录)
2. [注册(register)](#注册)
3. [获取个人信息(getPersonalInfo)](#获取个人信息)
4. [修改个人信息(modifyPersonalInfo)](#修改个人信息)

---

### [登录](#目录)
- `login`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| phone | string | 登录手机号码 |
| password | string | 登录密码 |


```js
{
    "success": true,
    "context": {
        "userId": "10000"
    }
}
```
| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | string | 用户Id |

---

### [注册](#目录)
- `register`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| phone | string | 登录手机号码 |
| email | string | 找回密码的邮箱 |
| password | string | 登录密码 |


```js
{
    "success": true
}
```
---

### [获取个人信息](#目录)
- `getPersonalInfo`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | string | 用户Id |


```js
{
    "success": true,
    "context": {
        "phone": "手机号码"
        "name": "用户名"
        "head": "头像"
        "position": "职位"
    }
}
```

### [修改个人信息](#目录)
- `modifyPersonalInfo`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | string | 用户Id |
| phone | string | 登录手机号码 |
| name | string | 用户名 |
| head | string | 头像 |
| position | string | 职位 |


```js
{
    "success": true,
}
```

### [修改密码](#目录)
- `modifyPassword`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | string | 用户Id |
| oldPassword | string | 旧密码 |
| newPassword | string | 新密码 |

```js
{
    "success": true,
}
```

### [添加日程](#目录)
- `addSchedule`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | string | 用户Id |
| time | string | 日程时间 |
| content | string | 日程内容 |
| state | string | 日程状态 |

```js
{
    "success": true,
}
```

### [更新日程](#目录)
- `updateSchedule`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| id | string | 日程Id |
| time | string | 日程时间 |
| content | string | 日程内容 |
| state | string | 日程状态 |

```js
{
    "success": true,
}
```

### [删除日程](#目录)
- `deleteSchedule`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| id | string | 日程Id |

```js
{
    "success": true,
}
```

### [获取日程列表](#目录)
- `getScheduleList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | string | 用户Id |
| time | string | 日程时间 |
| content | string | 日程内容 |
| state | string | 日程状态 |

```js
{
    "success": true,
    "context": {
        "scheduleList": [
            {
                "id":"123",
                "time":"8:00",
                "content":"要干嘛",
                "state":1
            }
        ]
    }
}
```

### [更新进度](#目录)
- `updateProgress`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| taskId | string | 任务Id |
| time | string | 更新时间 |
| content | string | 更新内容 |

```js
{
    "success": true,
}
```

### [获取进度列表](#目录)
- `getProgressList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| taskId | string | 任务Id |

```js
{
    "success": true,
    "context": {
        "progressList": [
            {
                "time":"8:00",
                "content":"状态",
            }
        ]
    }
}
```

### [打回任务](#目录)
- `rejectTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| taskId | string | 任务Id |
| content | string | 审批内容 |

```js
{
    "success": true,
}
```

### [通过任务](#目录)
- `passTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| taskId | string | 任务Id |

```js
{
    "success": true,
}
```
