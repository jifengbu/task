## 目录
1. [登录(login)](#登录)
2. [注册(register)](#注册)
3. [获取个人信息(getPersonalInfo)](#获取个人信息)
4. [修改个人信息(modifyPersonalInfo)](#修改个人信息)
5. [修改密码(modifyPassword)](#修改密码)
6. [创建任务(createTask)](#创建任务)
7. [修改任务(modifyTask)](#修改任务)
8. [删除任务(removeTask)](#删除任务)
9. [获取用户列表(getClientList)](#获取用户列表)
10. [获取用户详情(getClientDetail)](#获取用户详情)
11. [获取任务列表(getTaskList)](#获取任务列表)
12. [获取任务详情(getTaskDetail)](#获取任务详情)
13. [打回任务(rejectTask)](#打回任务)
14. [通过任务(passTask)](#通过任务)
15. [创建提醒(createRemind)](#创建提醒)
16. [更新提醒(updateRemind)](#更新提醒)
17. [推送提醒通知(pushRemindNotice)](#推送提醒通知)
18. [添加日程(addSchedule)](#添加日程)
19. [更新日程(updateSchedule)](#更新日程)
20. [删除日程(deleteSchedule)](#删除日程)
21. [获取日程列表(getScheduleList)](#获取日程列表)
22. [更新进度(updateProgress)](#更新进度)
23. [获取进度列表(getProgressList)](#获取进度列表)

---

### 1. [登录](#目录)
- `login`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| phone | String | 登录手机号码 |
| password | String | 登录密码 |


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
| userId | String | 用户Id |

---

### 2. [注册](#目录)
- `register`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| phone | String | 登录手机号码 |
| email | String | 找回密码的邮箱 |
| password | String | 登录密码 |


```js
{
    "success": true
}
```
---

### 3. [获取个人信息](#目录)
- `getPersonalInfo`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | String | 用户Id |


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

### 4. [修改个人信息](#目录)
- `modifyPersonalInfo`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | String | 用户Id |
| phone | String | 登录手机号码 |
| name | String | 用户名 |
| head | String | 头像 |
| position | String | 职位 |


```js
{
    "success": true,
}
```

### 5. [修改密码](#目录)
- `modifyPassword`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | String | 用户Id |
| oldPassword | String | 旧密码 |
| newPassword | String | 新密码 |

```js
{
    "success": true,
}
```

### 6. [创建任务](#目录)
- `createTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | String | 用户Id |
| supervisorId | String | 监督人Id |
| executorId | String | 执行人Id |
| title | String | 标题 |
| content | String | 内容 |
| audioList | Array | 音频列表 |
| imageList | Array | 图片列表 |
| type | Number | 任务类型(0：一般任务， 1：紧急任务，2：加急任务) |
| startTime | String | 开始时间 |
| endTime | String | 结束时间 |
| remindId | String | 提醒Id |

```js
{
    "success": true,
}
```

### 7. [修改任务](#目录)
- `modifyTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | String | 用户Id |
| supervisorId | String | 监督人Id |
| executorId | String | 执行人Id |
| title | String | 标题 |
| content | String | 内容 |
| audioList | Array | 音频列表 |
| imageList | Array | 图片列表 |
| type | Number | 任务类型(0：一般任务， 1：紧急任务，2：加急任务) |
| startTime | String | 开始时间 |
| endTime | String | 结束时间 |
| remindId | String | 提醒Id |

```js
{
    "success": true,
}
```


### 8. [删除任务](#目录)
- `removeTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| taskId | String | 任务Id |

```js
{
    "success": true,
}
```

### 9. [获取用户列表](#目录)
- `getClientList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | String | 用户Id |
| keyword | String | 搜索关键字 |
| pageNo | Number | 第几页 |
| pageSize | Number | 每页的数量 |

```js
{
    "success": true,
    "context": {
        "clientList": [
            {
                "phone": "18085192480",
                "email": "42550564@qq.com",
                "name": "方运江",
                "head": "http://localhost:3000/api/image?id=59117df95150c20e08b560af",
                "partment": {
                    "name": "123",
                    "id": "591fa902b526bebf009d92c3"
                },
                "reservePhone": [
                    "18085192480"
                ],
                "id": "59117ddb5150c20e08b560ac"
            }
        ]
    }
}
```

### 10. [获取用户详情](#目录)
- `getClientDetail`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | String | 用户Id |
| clientId | String | 获取详情的用户Id |

```js
{
    "success": true,
    "context": {
        "phone": "18085192480",
        "email": "42550564@qq.com",
        "name": "方运江",
        "head": "http://localhost:3000/api/image?id=59117df95150c20e08b560af",
        "birthday": "1982-02-25",
        "partment": {
            "name": "123",
            "descript": "123",
            "chargeMan": {
                "phone": "18085192480",
                "name": "方运江",
                "head": "http://localhost:3000/api/image?id=59117df95150c20e08b560af",
                "id": "59117ddb5150c20e08b560ac"
            },
            "superior": {
                "name": "工信部",
                "id": "591cf488f6a0636b34d64985"
            },
            "phoneList": [
                "18085192480"
            ],
            "id": "591fa902b526bebf009d92c3",
            "membersNum": 1,
            "suborsNum": 1
        },
        "registerTime": "2017-05-09 16:29:15",
        "salary": 0,
        "reservePhone": [
            "18085192480"
        ],
        "age": 35,
        "sex": 0,
        "id": "59117ddb5150c20e08b560ac"
    }
}
```

### 11. [获取任务列表](#目录)
- `getTaskList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | String | 用户Id |
| userType | Number | 用户角色(0：执行， 1：监督，2：审批，3：发起) |
| type | Number | 任务类型(0：一般任务， 1：紧急任务，2：加急任务) |

```js
{
    "success": true,
    "context": {
        "taskList": [
            {
                "id":"任务Id",
                "title":"什么标题",
                "endTime":"8:00",
                "content":"内容",
            }
        ]
    }
}
```


### 12. [获取任务详情](#目录)
- `getTaskDetail`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| taskId | String | 任务Id |

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

### 13. [打回任务](#目录)
- `rejectTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| taskId | String | 任务Id |
| content | String | 审批内容 |

```js
{
    "success": true,
}
```

### 14. [通过任务](#目录)
- `passTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| taskId | String | 任务Id |

```js
{
    "success": true,
}
```

### 15. [创建提醒](#目录)
- `createRemind`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| defaultRemindRule | String | 默认提醒规则 |
| customRemindTime | Date | 自定义提醒时间 |

```js
{
    "success": true,
}
```

### 16. [更新提醒](#目录)
- `updateRemind`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| remindId | String | 提醒Id |
| defaultRemindRule | String | 默认提醒规则 |
| customRemindTime | Date | 自定义提醒时间 |

```js
{
    "success": true,
}
```

### 17. [推送提醒通知](#目录)
- `pushRemindNotice`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| receiveUserId | String | 接受者用户Id |
| remindId | String | 提醒Id |


```js
{
    "success": true,
}
```

### 18. [添加日程](#目录)
- `addSchedule`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | String | 用户Id |
| time | String | 日程时间 |
| content | String | 日程内容 |
| state | String | 日程状态 |

```js
{
    "success": true,
}
```

### 19. [更新日程](#目录)
- `updateSchedule`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| id | String | 日程Id |
| time | String | 日程时间 |
| content | String | 日程内容 |
| state | String | 日程状态 |

```js
{
    "success": true,
}
```

### 20. [删除日程](#目录)
- `deleteSchedule`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| id | String | 日程Id |

```js
{
    "success": true,
}
```

### 21. [获取日程列表](#目录)
- `getScheduleList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | String | 用户Id |
| time | String | 日程时间 |
| content | String | 日程内容 |
| state | String | 日程状态 |

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

### 22. [更新进度](#目录)
- `updateProgress`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| taskId | String | 任务Id |
| time | String | 更新时间 |
| content | String | 更新内容 |

```js
{
    "success": true,
}
```

### 23. [获取进度列表](#目录)
- `getProgressList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| taskId | String | 任务Id |

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
