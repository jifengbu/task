#import <React/RCTBridge.h>
#import <React/RCTUtils.h>
#import <React/RCTEventDispatcher.h>
#import <LocalAuthentication/LocalAuthentication.h>


#define EVENT_FINGER_RETURN @"FINGER_RETURN"

@interface RCTUtilsModule : NSObject <RCTBridgeModule>

@end

@implementation RCTUtilsModule

@synthesize bridge = _bridge;

- (id)init {
  self = [super init];
  if (self) {
  }
  return self;
}

RCT_EXPORT_MODULE(UtilsModule);

//let returnStr1 = "当前设备不支持指纹";
//let returnStr2 = "当前设备没有设置密码";
//let returnStr3 = "当前设备没有设置指纹";
//let returnStr4 = "解锁开始";
//let returnStr5 = "解锁失败";
//let returnStr6 = "解锁成功";
//let returnStr7 = "跳到用户登录界面";//ios使用。

RCT_EXPORT_METHOD(fingerPrint) {
  //NSString *options = data[@"options"];
  //NSString *chatroomID = data[@"chatroomID"];
  
  LAContext *ctx = [[LAContext alloc] init];
  NSError *error = nil;
  NSString *myLocalizedReasonString = @"请输入指纹";
  // 判断设备是否支持指纹识别
  if ([ctx canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error])
  {
    NSLog(@"指纹功能支持");
    //提示：指纹识别只是判断当前用户是否是手机的主人！
    [ctx evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics localizedReason:myLocalizedReasonString reply:^(BOOL success, NSError *error)
    {
      error = error;
      NSLog(@"%d %@", success, error);
      
      if (success)
      {
        // 登录成功
        NSLog(@"验证成功");
        [self sendFingerReturn:6];
      }else
      {
        NSLog(@"%@",error.localizedDescription);
        switch (error.code) {
          case LAErrorSystemCancel:
          {
            NSLog(@"系统取消验证Touch ID");
            [self sendFingerReturn:5];
            break;
          }
          case LAErrorUserCancel:
          {
            NSLog(@"用户取消验证Touch ID");
            break;
          }
          case LAErrorUserFallback:
          {
            NSLog(@"用户选择输入密码，主线程处理，切换到输入密码界面");
            [self sendFingerReturn:7];
            break;
          }
          default:
            [self sendFingerReturn:5];
            break;
        }
      }
    }];
  
  } else {
    NSLog(@"指纹功能不支持");
    switch (error.code) {
      case LAErrorTouchIDNotEnrolled:
      {
        NSLog(@"没有录入指纹");
        [self sendFingerReturn:3];
        break;
      }
      case LAErrorPasscodeNotSet:
      {
        NSLog(@"没有设置密码");
        [self sendFingerReturn:2];
        break;
      }
      default:
      {
        NSLog(@"指纹功能不支持");
        [self sendFingerReturn:1];
        break;
      }
    }
  }

}

- (void)sendFingerReturn : (int32_t) result {
  dispatch_async(dispatch_get_main_queue(), ^{
    [self.bridge.eventDispatcher sendAppEventWithName:EVENT_FINGER_RETURN
                                                 body:@{@"result": [NSNumber numberWithInteger:(result)]}];
  });
}

@end
