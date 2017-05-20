## 目录
1. [登录(login)](#登录)
2. [注册(register)](#注册)
3. [获取个人信息(getPersonalInfo)](#获取个人信息)
4. [修改个人信息(modifyPersonalInfo)](#修改个人信息)
5. [修改密码(modifyPassword)](#修改密码)
6. [创建提醒(createRemind)](#创建提醒)
7. [更新提醒(updateRemind)](#更新提醒)
8. [推送提醒通知(pushRemindNotice)](#推送提醒通知)
9. [添加日程(addSchedule)](#添加日程)
10. [更新日程(updateSchedule)](#更新日程)
11. [删除日程(deleteSchedule)](#删除日程)
12. [获取日程列表(getScheduleList)](#获取日程列表)
13. [更新进度(updateProgress)](#更新进度)
14. [获取进度列表(getProgressList)](#获取进度列表)
15. [创建任务(createTask)](#创建任务)
16. [修改任务(modifyTask)](#修改任务)
17. [删除任务(removeTask)](#删除任务)
18. [获取任务列表(getTaskList)](#获取任务列表)
19. [获取任务详情(getTaskDetail)](#获取任务详情)
20. [打回任务(rejectTask)](#打回任务)
21. [通过任务(passTask)](#通过任务)

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

### [创建提醒](#目录)
- `createRemind`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| defaultRemindRule | string | 默认提醒规则 |
| customRemindTime | Date | 自定义提醒时间 |

```js
{
    "success": true,
}
```

### [更新提醒](#目录)
- `updateRemind`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| remindId | string | 提醒Id |
| defaultRemindRule | string | 默认提醒规则 |
| customRemindTime | Date | 自定义提醒时间 |

```js
{
    "success": true,
}
```

### [推送提醒通知](#目录)
- `pushRemindNotice`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| receiveUserId | string | 接受者用户Id |
| remindId | string | 提醒Id |


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

### [创建任务](#目录)
- `createTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | string | 用户Id |
| supervisorId | string | 监督人Id |
| executorId | string | 执行人Id |
| title | string | 标题 |
| content | string | 内容 |
| audioList | Array | 音频列表 |
| imageList | Array | 图片列表 |
| type | Number | 任务类型(0：一般任务， 1：紧急任务，2：加急任务) |
| startTime | string | 开始时间 |
| endTime | string | 结束时间 |
| remindId | string | 提醒Id |

```js
{
    "success": true,
}
```

### [修改任务](#目录)
- `modifyTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | string | 用户Id |
| supervisorId | string | 监督人Id |
| executorId | string | 执行人Id |
| title | string | 标题 |
| content | string | 内容 |
| audioList | Array | 音频列表 |
| imageList | Array | 图片列表 |
| type | Number | 任务类型(0：一般任务， 1：紧急任务，2：加急任务) |
| startTime | string | 开始时间 |
| endTime | string | 结束时间 |
| remindId | string | 提醒Id |

```js
{
    "success": true,
}
```


### [删除任务](#目录)
- `removeTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| taskId | string | 任务Id |

```js
{
    "success": true,
}
```

### [获取任务列表](#目录)
- `getTaskList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | string | 用户Id |
| userType | Number | 用户角色(0：执行， 1：监督，2：审批，3：发起) |
| type | Number | 任务类型(0：一般任务， 1：紧急任务，2：加急任务) |

```js
{
    "success": true,
    "context": {
        "taskList": [
            {
                "id":"任务ID",
                "title":"什么标题",
                "endTime":"8:00",
                "content":"内容",
            }
        ]
    }
}
```


### [获取任务详情](#目录)
- `getTaskDetail`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| taskId | string | 任务Id |

```js
{
    "success": true,
    "context": {
        "supervisorId" : "监督人Id",
        "executorId" : "执行人Id",
        "title" : "标题",
        "content" : "内容",
        "audioList" : "音频列表",
        "imageList" : "图片列表",
        "type" : "任务类型",
        "startTime" : "开始时间",
        "endTime" : "结束时间",
        "remindId" : "提醒Id"
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
