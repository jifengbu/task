# 目录
## 基础api
##### 1. [登录(login)](#1-登录)
##### 2. [注册(register)](#2-注册)
##### 3. [获取个人信息(getPersonalInfo)](#3-获取个人信息)
##### 4. [修改个人信息(modifyPersonalInfo)](#4-修改个人信息)
##### 5. [修改密码(modifyPassword)](#5-修改密码)
##### 6. [意见反馈(submitFeedback)](#6-意见反馈)
##### 7. [上传文件(uploadFile)](#7-上传文件)
## 任务api
##### 8. [获取用户列表(getClientList)](#8-获取用户列表)
##### 9. [获取任务类型列表(getTaskTypeList)](#9-获取任务类型列表)
##### 10. [创建单一任务(leaderCreateTask)](#10-创建单一任务)
##### 11. [创建综合任务(secretaryCreateTask)](#11-创建综合任务)
##### 12. [重新提交审核任务(reapplyPublishTaskList)](#12-重新提交审核任务)
##### 13. [领导获取待审批发布的任务列表(getApplyPublishTaskList)](#13-领导获取待审批发布的任务列表)
##### 14. [领导或者综合部获取待审批完成的任务列表(getApplyFinishTaskList)](#14-领导或者综合部获取待审批完成的任务列表)
##### 15. [根据类型获取的任务列表(getTaskListByType)](#15-根据类型获取的任务列表)
##### 16. [获取打回申请发布任务列表(getRejectTaskList)](#16-获取打回申请发布任务列表)
##### 17. [获取最关心任务列表(getMostCaredTaskList)](#17-获取最关心任务列表)
##### 18. [获取单一任务的详情(getSingleTaskDetail)](#18-获取单一任务的详情)
##### 19. [获取群组任务的详情(getGroupTaskDetail)](#19-获取群组任务的详情)
##### 20. [修改任务(modifyTask)](#20-修改任务)
##### 21. [修改群组任务(modifyGroupTask)](#21-修改群组任务)
##### 22. [删除群组任务(removeGroupTask)](#22-删除群组任务)
##### 23. [删除任务(removeGroupTask)](#23-删除任务)
##### 24. [打回申请发布任务(rejectPublishTask)](#24-打回申请发布任务)
##### 25. [通过发布任务的申请(agreePublishTask)](#25-通过发布任务的申请)
##### 26. [申请完成任务(applyFinishTask)](#26-申请完成任务)
##### 27. [同意完成任务的申请(agreeFinishTask)](#27-同意完成任务的申请)
##### 28. [打回完成发布任务(rejectFinishTask)](#28-打回完成发布任务)
##### 29. [获取统计数据(getStatics)](#29-获取统计数据)
## 日程api
##### 30. [创建日程(createSchedule)](#30-创建日程)
##### 31. [完成日程(finishSchedule)](#31-完成日程)
##### 32. [修改日程(modifySchedule)](#32-修改日程)
##### 33. [删除日程(removeSchedule)](#33-删除日程)
##### 34. [获取日程列表(getScheduleList)](#34-获取日程列表)
## 提醒api
##### 35. [提醒任务(remindTask)](#35-提醒任务)
##### 36. [更新任务进度(updateTaskProgress)](#36-更新任务进度)
##### 37. [获取进度列表(getTaskProgressList)](#37-获取进度列表)
## 通知
##### 38. [综合部创建群组任务的通知(NEW_PUBLISH_TASK_NF)](#38-综合部创建群组任务的通知)
##### 39. [领导同意申请发布任务的通知和领导发布单任务的通知(AGREE_PUBLISH_TASK_NF)](#39-领导同意申请发布任务的通知和领导发布单任务的通知)
##### 40. [领导拒绝申请发布任务通知(REJECT_PUBLISH_TASK_NF)](#40-领导拒绝申请发布任务通知)
##### 41. [申请完成任务的通知(APPLY_FINISH_TASK_NF)](#41-申请完成任务的通知)
##### 42. [同意完成任务的通知(AGREE_FINISH_TASK_NF)](#42-同意完成任务的通知)
##### 43. [拒绝完成任务的通知(REJECT_FINISH_TASK_NF)](#43-拒绝完成任务的通知)
##### 44. [定时任务通知(REMIND_TASK_NF)](#44-定时任务通知)
## 协议文档
##### 45. [用户协议(user)](#45-用户协议)
##### 46. [获取软件许可协议(software)](#46-获取软件许可协议)
##### 47. [关于(about)](#47-关于)

---

## 基础api

---

### 1. [登录](#1-登录login)
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

---

### 2. [注册](#2-注册register)
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

### 3. [获取个人信息](#3-获取个人信息getpersonalinfo)
- `getPersonalInfo`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |


```js
{
    "success": true,
    "context": {
        "phone": "手机号码"
        "name": "用户名"
        "head": "头像"
        "position": "职位",
        "authority": 1
    }
}
```
###### authority的说明：
```
authority为用户权限， 1：普通权限 2：拥有领导权限，4：拥有综合部权限，8：拥有监督者权限
```
---

### 4. [修改个人信息](#4-修改个人信息modifypersonalinfo)
- `modifyPersonalInfo`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| phone | String | 登录手机号码 |
| name | String | 用户名 |
| head | String | 头像 |
| position | String | 职位 |


```js
{
    "success": true,
}
```

---

### 5. [修改密码](#5-修改密码modifypassword)
- `modifyPassword`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| oldPassword | String | 旧密码 |
| newPassword | String | 新密码 |

```js
{
    "success": true,
}
```

---

### 6. [意见反馈](#6-意见反馈submitfeedback)
- `submitFeedback`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| content | String | 内容 |
| email | String | 联系邮箱 |

```js
{
    "success": true,
}
```

---

### 7. [上传文件](#7-上传文件uploadfile)
- `uploadFile`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| fileKey | String | key值 |
| fileName | String | 文件名 |
| mimeType | String | mimeType |
| params | String | params |

###### params结构
| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |

使用方法：

```js
...
uploadHead(filePath) {
    const options = {};
    options.fileKey = 'file';
    options.fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
    options.mimeType = 'image/png';
    options.params = {
        userId: app.personal.info.userId,
    };
    UPLOAD(filePath, app.route.ROUTE_UPDATE_FILE, options, (progress) => console.log(progress), this.uploadSuccessCallback, this.uploadErrorCallback, true);
},

uploadSuccessCallback (data) {
    if (data.success) {
        this.modifyUserInfo(data.context.url);
    } else {
        Toast('上传头像失败');
        this.goBack();
    }
},
uploadErrorCallback () {
    Toast('上传头像失败');
    this.goBack();
},
...
```

---

## 任务api

---

### 8. [获取用户列表](#8-获取用户列表getclientlist)
- `getClientList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| authority | Number | [权限](#authority的说明) |

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
                "id": "59117ddb5150c20e08b560ac"
            }
        ]
    }
}
```

---

### 9. [获取任务类型列表](#9-获取任务类型列表gettasktypelist)
- `getTaskTypeList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
```js
{
    "success": true,
    "context": {
        "taskTypeList": [
            {
                "key": "1",
                "name": "综合任务",
            }
        ]
    }
}
```

---

### 10. [创建单一任务](#10-创建单一任务leadercreatetask)
- `leaderCreateTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| executorId | ID | 执行人Id |
| supervisorId | ID | 监督人Id |
| title | String | 标题 |
| content | String | 内容 |
| audioList | Array | [音频列表](#audiolist格式) |
| imageList | Array | 图片列表 |
| remindList | Array | [提醒列表](#remindlist格式) |
| type | Number | 任务类型 |
| expectStartTime | String | 期望开始时间 |
| expectFinishTime | String | 期望结束时间 |

###### audioList格式：

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| url | String | 上传音频文件返回的url |
| duration | Number | 音频文件的时长 |

###### remindList格式：
```
默认列表：
1：每天提醒1次（早上8:00）
2：每天提醒2次（早上8：00，下午13:00）
3：任务结束的最后10天提醒（每天提醒一次 早上9:00）
4：任务结束的最后5天提醒（每天提醒一次 早上9:00）
5：任务结束的最后3天提醒（每天提醒一次 早上9:00）
6：任务结束的最后1天提醒（每天提醒2次早上8：00，下午13:00）
7：任务执行的中间时期  提醒2天（早上8：00，下午13:00)
上传参数时，如果为默认的，填写默认列表的序号，如果为自定义，则填写时间
如： [1, 2, 4, '2017-06-01 08:00:00']
```

```js
{
    "success": true,
    "context": {
       "taskId": "59362535eae76f2c964bf8fc"
    }
}
```

---

### 11. [创建综合任务](#11-创建综合任务secretarycreatetask)
- `secretaryCreateTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| examinerId | ID | 审核人Id |
| title | String | 标题 |
| content | String | 内容 |
| taskList | Array | 任务列表 |

- taskList 格式：

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| executorId | ID | 执行人Id |
| supervisorId | ID | 监督人Id |
| title | String | 标题 |
| content | String | 内容 |
| audioList | Array | [音频列表](#audiolist格式) |
| imageList | Array | 图片列表 |
| remindList | Array | [提醒列表](#remindlist格式) |
| type | Number | 任务类型(0：一般任务， 1：紧急任务，2：加急任务) |
| expectStartTime | String | 期望开始时间 |
| expectFinishTime | String | 期望结束时间 |

```js
{
    "success": true,
    "context": {
        "groupId": "5936254feae76f2c964bf905",
        "taskIdList": [
          "5936254feae76f2c964bf906"
        ]
  }
}
```

---

### 12. [重新提交审核任务](#12-重新提交审核任务reapplypublishtasklist)
- `reapplyPublishTaskList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| taskId | ID | 任务Id |

```js
{
    "success": true
}
```

---

### 13. [领导获取待审批发布的任务列表](#13-领导获取待审批发布的任务列表getapplypublishtasklist)
- `getApplyPublishTaskList`
- 请求方式：`POST`
- 备注：获取到的是多任务或者单任务

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| pageNo | Number | 页号 |
| pageSize | Number | 每页数量 |

```js
{
    "success": true,
    "context": {
        "taskList": [
            {
                "id": "5922b7726df4409ec01c425d",
                "title": "总测试标题",
                "content": "总测试内容",
                "modifyTime": "2017-05-22 18:03:30",
                "expectFinishTime": "2017-05-16 03:00:00",
                "expectStartTime": "2017-05-15 03:00:00",
                "taskNumbers": 1,
                "isSingleTask": true //是否是单任务
            }
        ]
    }
}
```

---

### 14. [领导或者综合部获取待审批完成的任务列表](#14-领导或者综合部获取待审批完成的任务列表getapplyfinishtasklist)
- `getApplyFinishTaskList`
- 请求方式：`POST`
- 备注：谁发布的任务谁来审批完成

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| pageNo | Number | 页号 |
| pageSize | Number | 每页数量 |

```js
{
    "success": true,
    "context": {
        "taskList": [
            {
                "id": "5922b7726df4409ec01c425d",
                "title": "总测试标题",
                "content": "总测试内容",
                "modifyTime": "2017-05-22 18:03:30",
                "expectFinishTime": "2017-05-16 03:00:00",
                "expectStartTime": "2017-05-15 03:00:00",
                "taskNumbers": 1,
            }
        ]
    }
}
```

---

### 15. [根据类型获取的任务列表](#15-根据类型获取的任务列表gettasklistbytype)
- `getTaskListByType`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| type | Number | [类型](#9-获取任务类型列表) |
| keyword | String | 搜索关键字 |
| pageNo | Number | 页号 |
| pageSize | Number | 每页数量 |

```js
{
    "success": true,
    "context": {
        "taskList": [
            {
                "title": "测试任务",
                "content": "认真测试",
                "modifyTime": "2017-05-23 08:44:58",
                "expectFinishTime": "2017-05-16 03:00:00",
                "type": 1,
                "id": "5923860a5c1070c1e96defd2"
            }
        ]
    }
}
```

---

### 16. [获取打回申请发布任务列表](#16-获取打回申请发布任务列表getrejecttasklist)
- `getRejectTaskList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| role | String | 角色 = ['`leader`', '`secretary`', '`executor`'] |
| pageNo | Number | 页号 |
| pageSize | Number | 每页数量 |

```js
{
    "success": true,
    "context": {
        "taskList": [
            {
                "title": "测试任务",
                "content": "认真测试",
                "modifyTime": "2017-05-23 08:44:58",
                "expectFinishTime": "2017-05-16 03:00:00",
                "rejectPublishReason": "不合格",
                "rejectFinishReason": "不合格",
                "type": 1,
                "state": 1,
                "id": "5923860a5c1070c1e96defd2"
            }
        ]
    }
}
```

###### 状态说明：
`1：待审批，2：驳回审批，4：通过审批，8：待执行， 16：进行中，32：待完成审核，64：驳回完成审核，128：完成`

---

### 17. [获取最关心任务列表](#17-获取最关心任务列表getmostcaredtasklist)
- `getMostCaredTaskList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| pageNo | Number | 页号 |
| pageSize | Number | 每页数量 |

```js
{
    "success": true,
    "context": {
        "taskList": [
            {
                "title": "测试任务",
                "content": "认真测试",
                "modifyTime": "2017-05-23 08:44:58",
                "expectStartTime": "2017-05-16 03:00:00",
                "expectFinishTime": "2017-05-16 03:00:00",
                "rejectPublishReason": "不合格",
                "rejectFinishReason": "不合格",
                "type": 1,
                "state": 1,
                "id": "5923860a5c1070c1e96defd2"
            }
        ]
    }
}
```

---

### 18. [获取单一任务的详情](#18-获取单一任务的详情getsingletaskdetail)
- `getSingleTaskDetail`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| taskId | ID | 任务Id |

```js
{
    "success": true,
    "context": {
        "title": "测试标题",
        "content": "测试内容",
        "examineFinishTime": "2017-05-22 18:03:30",
        "applyFinishTime": "2017-05-22 18:03:30",
        "modifyTime": "2017-05-22 18:03:30",
        "startExecTime": "2017-05-22 18:03:30",
        "examineTime": "2017-05-22 18:03:30",
        "publishTime": "2017-05-22 18:03:30",
        "expectFinishTime": "2017-05-16 03:00:00",
        "expectStartTime": "2017-05-15 03:00:00",
        "state": 1,
        "type": 1,
        "imageList": [
            "http://localhost:3000/api/image?id=5922b7726df4409ec01c425b"
        ],
        "audioList": [
            {
                "url": "http://localhost:3000/api/image?id=5922b7726df4409ec01c425c",
                "duration": 10
            }
        ],
        "supervisor": {
            "phone": "18085192480",
            "name": "方运江",
            "id": "59117ddb5150c20e08b560ac"
        },
        "executor": {
            "phone": "18085192480",
            "name": "方运江",
            "id": "59117ddb5150c20e08b560ac"
        },
        "id": "5922b7726df4409ec01c425e"
    }
}
```

---

### 19. [获取群组任务的详情](#19-获取群组任务的详情getgrouptaskdetail)
- `getGroupTaskDetail`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| taskId | ID | 任务Id |

```js
{
    "success": true,
    "context": {
        "title": "总测试标题",
        "content": "总测试内容",
        "taskList": [
            {
                "title": "测试标题",
                "content": "测试内容",
                "examineFinishTime": "2017-05-22 18:03:30",
                "applyFinishTime": "2017-05-22 18:03:30",
                "modifyTime": "2017-05-22 18:03:30",
                "startExecTime": "2017-05-22 18:03:30",
                "examineTime": "2017-05-22 18:03:30",
                "publishTime": "2017-05-22 18:03:30",
                "expectFinishTime": "2017-05-16 03:00:00",
                "expectStartTime": "2017-05-15 03:00:00",
                "state": 1,
                "type": 1,
                "imageList": [
                    "http://localhost:3000/api/image?id=5922b7726df4409ec01c425b"
                ],
                "audioList": [
                    {
                        "url": "http://localhost:3000/api/image?id=5922b7726df4409ec01c425c",
                        "duration": 10
                    }
                ],
                "supervisor": {
                    "phone": "18085192480",
                    "name": "方运江",
                    "id": "59117ddb5150c20e08b560ac"
                },
                "executor": {
                    "phone": "18085192480",
                    "name": "方运江",
                    "id": "59117ddb5150c20e08b560ac"
                },
                "id": "5922b7726df4409ec01c425e"
            }
        ],
        "id": "5922b7726df4409ec01c425d"
    }
}
```

---

### 20. [修改任务](#20-修改任务modifytask)
- `modifyTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| taskId | ID | 任务Id |
| executorId | ID | 执行人Id |
| supervisorId | ID | 监督人Id |
| title | String | 标题 |
| content | String | 内容 |
| audioList | Array | [音频列表](#audiolist格式) |
| imageList | Array | 图片列表 |
| remindList | Array | [提醒列表](#remindlist格式) |
| type | Number | 任务类型 |
| expectStartTime | String | 期望开始时间 |
| expectFinishTime | String | 期望结束时间 |

```js
{
    "success": true,
}
```

---

### 21. [修改群组任务](#21-修改群组任务modifygrouptask)
- `modifyGroupTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| taskId | ID | 任务Id |
| examinerId | ID | 审核人Id |
| title | String | 标题 |
| content | String | 内容 |

```js
{
    "success": true,
}
```

---

### 22. [删除群组任务](#22-删除群组任务removegrouptask)
- `removeGroupTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| taskId | ID | 任务Id |

```js
{
    "success": true,
}
```

---

### 23. [删除任务](#23-删除任务removegrouptask)
- `removeGroupTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| taskId | ID | 任务Id |

```js
{
    "success": true,
}
```

---

### 24. [打回申请发布任务](#24-打回申请发布任务rejectpublishtask)
- `rejectPublishTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| taskId | ID | 任务Id |
| reason | String | 被打回的原因 |

```js
{
    "success": true,
}
```

---

### 25. [通过发布任务的申请](#25-通过发布任务的申请agreepublishtask)
- `agreePublishTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| taskId | ID | 任务Id |

```js
{
    "success": true,
}
```

---

### 26. [申请完成任务](#26-申请完成任务applyfinishtask)
- `applyFinishTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| taskId | ID | 任务Id |

```js
{
    "success": true,
}
```

---

### 27. [同意完成任务的申请](#27-同意完成任务的申请agreefinishtask)
- `agreeFinishTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| taskId | ID | 任务Id |

```js
{
    "success": true,
}
```

---

### 28. [打回完成发布任务](#28-打回完成发布任务rejectfinishtask)
- `rejectFinishTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| taskId | ID | 任务Id |
| reason | String | 被打回的原因 |

```js
{
    "success": true,
}
```

---

### 29. [获取统计数据](#29-获取统计数据getstatics)
- `getStatics`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| typeList | Array | [任务类型List](#9-获取任务类型列表) |

```js
{
    "success": true,
    "context": {
        "mywork": {
            "finish": 0,
            "unfinish": 4
        },
        "publishTask": {
            "month": [ 5, 5, 5 ],
            "quarter": [ 0, 0, 0 ],
            "year": [ 0, 0, 0 ]
        },
        "finishTask": {
            "month": { "finish": 0, "unfinish": 0 },
            "quarter": { "finish": 0, "unfinish": 0 },
            "year": { "finish": 0, "unfinish": 0 }
        },
        "finishDetail": [
            { "finish": 0, "unfinish": 4, "name": "fang" },
            { "finish": 1, "unfinish": 0, "name": "方运江" }
        ]
    }
}
```

---

## 日程api

---

### 30. [创建日程](#30-创建日程createschedule)
- `createSchedule`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| content | String | 日程内容 |

```js
{
    "success": true,
}
```

---

### 31. [完成日程](#31-完成日程finishschedule)
- `finishSchedule`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| scheduleId | ID | 日程Id |

```js
{
    "success": true,
}
```

---

### 32. [修改日程](#32-修改日程modifyschedule)
- `modifySchedule`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| scheduleId | ID | 日程Id |
| content | String | 日程内容 |

```js
{
    "success": true,
}
```

---

### 33. [删除日程](#33-删除日程removeschedule)
- `removeSchedule`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| scheduleId | ID | 日程Id |

```js
{
    "success": true,
}
```

---

### 34. [获取日程列表](#34-获取日程列表getschedulelist)
- `getScheduleList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 用户Id |
| time | String | 日程时间 |

```js
{
    "success": true,
    "context": {
        "scheduleList": [
            {
                "content": "测试日程",
                "state": 0,
                "id": "59225114d4118c3a27ff4a5d"
            }
        ]
    }
}
```
---

## 提醒api

---

### 35. [提醒任务](#35-提醒任务remindtask)
- `remindTask`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 监督人Id |
| taskId | ID | 任务Id |

```js
{
    "success": true,
}
```

---

### 36. [更新任务进度](#36-更新任务进度updatetaskprogress)
- `updateTaskProgress`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 监督人Id |
| taskId | ID | 任务Id |
| content | String | 填写的内容 |

```js
{
    "success": true,
}
```

---

### 37. [获取进度列表](#37-获取进度列表gettaskprogresslist)
- `getTaskProgressList`
- 请求方式：`POST`

| 参数名称 | 参数类型  | 描述 |
| :- |:-:| :-:|
| userId | ID | 监督人Id |
| taskId | ID | 任务Id |

```js
{
    "success": true,
    "context": {
        "ProgressList": [
            {
                "createTime": "2017-05-23 17:09:20",
                "content": "测试进度",
                "userName": "方运江",
                "id": "5923fc408ddca4373159bb66"
            },
            {
                "createTime": "2017-05-23 17:09:18",
                "content": "提醒一次任务",
                "userName": "方运江",
                "id": "5923fc3e8ddca4373159bb65"
            }
        ]
    }
}
```

---

## 通知

---

### 38. [综合部创建群组任务的通知](#38-综合部创建群组任务的通知new_publish_task_nf)
- `NEW_PUBLISH_TASK_NF`
- 接收方式：`Socket.io`
- 接收方：待审核任务的人(examinerId)

###### 通知的数据
```js
{
    "title": "测试标题",
    "content": "测试内容",
    "examineFinishTime": "2017-05-22 18:03:30",
    "applyFinishTime": "2017-05-22 18:03:30",
    "modifyTime": "2017-05-22 18:03:30",
    "startExecTime": "2017-05-22 18:03:30",
    "examineTime": "2017-05-22 18:03:30",
    "publishTime": "2017-05-22 18:03:30",
    "expectFinishTime": "2017-05-16 03:00:00",
    "expectStartTime": "2017-05-15 03:00:00",
    "state": 1,
    "type": 1,
    "imageList": [
        "http://localhost:3000/api/image?id=5922b7726df4409ec01c425b"
    ],
    "audioList": [
        {
            "url": "http://localhost:3000/api/image?id=5922b7726df4409ec01c425c",
            "duration": 10
        }
    ],
    "supervisor": {
        "phone": "18085192480",
        "name": "方运江",
        "id": "59117ddb5150c20e08b560ac"
    },
    "executor": {
        "phone": "18085192480",
        "name": "方运江",
        "id": "59117ddb5150c20e08b560ac"
    },
    "id": "5922b7726df4409ec01c425e"
}
```
---

### 39. [领导同意申请发布任务的通知和领导发布单任务的通知](#39-领导同意申请发布任务的通知和领导发布单任务的通知agree_publish_task_nf)
- `AGREE_PUBLISH_TASK_NF`
- 接收方式：`Socket.io`
- 接收方：待审核任务的人(examinerId)
- [通知的数据](#通知的数据)


---

### 40. [领导拒绝申请发布任务通知](#40-领导拒绝申请发布任务通知reject_publish_task_nf)
- `REJECT_PUBLISH_TASK_NF`
- 接收方式：`Socket.io`
- 接收方：申请发布任务的人(publisherId)
- [通知的数据](#通知的数据)

---

### 41. [申请完成任务的通知](#41-申请完成任务的通知apply_finish_task_nf)
- `APPLY_FINISH_TASK_NF`
- 接收方式：`Socket.io`
- 接收方：发布任务的人(publisherId)
- [通知的数据](#通知的数据)

---

### 42. [同意完成任务的通知](#42-同意完成任务的通知agree_finish_task_nf)
- `AGREE_FINISH_TASK_NF`
- 接收方式：`Socket.io`
- 接收方：申请完成任务的人
- [通知的数据](#通知的数据)

---

### 43. [拒绝完成任务的通知](#43-拒绝完成任务的通知reject_finish_task_nf)
- `REJECT_FINISH_TASK_NF`
- 接收方式：`Socket.io`
- 接收方：申请完成任务的人(executorId)
- [通知的数据](#通知的数据)

---

### 44. [定时任务通知](#44-定时任务通知remind_task_nf)
- `REMIND_TASK_NF`
- 接收方式：`Socket.io`
- 接收方：和任务相关的人
- [通知的数据](#通知的数据)

---

## 协议文档

---

### 45. [用户协议](#45-用户协议user)
- `user`
- url: `protocals/user.html`

---

### 46. [获取软件许可协议](#46-获取软件许可协议software)
- `software`
- url: `protocals/software.html`

---

### 47. [关于](#47-关于about)
- `about`
- url: `protocals/about.html`
