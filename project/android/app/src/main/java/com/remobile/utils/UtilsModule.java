package com.remobile.utils;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.PowerManager;
import com.facebook.react.bridge.Callback;
import com.remobile.cordova.CordovaPlugin;

import android.content.DialogInterface;
import android.os.Handler;
import android.os.Message;
import android.support.v4.hardware.fingerprint.FingerprintManagerCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

public class UtilsModule extends CordovaPlugin {

    public static String FLOG_TAG = "UtilsModule";

    public static final String EVENT_FINGER_RETURN = "FINGER_RETURN";
    public static final String returnStr1 = "当前设备不支持指纹";
    public static final String returnStr2 = "当前设备没有设置密码";
    public static final String returnStr3 = "当前设备没有设置指纹";
    public static final String returnStr4 = "解锁开始";
    public static final String returnStr5 = "解锁失败";
    public static final String returnStr6 = "解锁成功";

    private Activity activity;
    private ReactApplicationContext reactContext;
    private PowerManager.WakeLock wakeLock;
    private Callback callback;


    public UtilsModule(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext, true);
        this.activity = activity;
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "UtilsModule";
    }

    public int sendFingerReturn(final int result) {
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                WritableMap params = Arguments.createMap();
                params.putInt("result", result);
                getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(EVENT_FINGER_RETURN, params);
            }
        });
        return 1;
    }

    @ReactMethod
    public void fingerPrint() {
        FingerPrint.callFingerPrint(reactContext, new FingerPrint.OnCallBackListenr() {
            @Override
            public void onSupportFailed() {
                // showToast("当前设备不支持指纹");
                sendFingerReturn(1);
//                returnFlag.invoke(1);
            }

            @Override
            public void onInsecurity() {
                sendFingerReturn(2);
                // showToast("当前设备未处于安全保护中");
//                returnFlag.invoke(2);
            }

            @Override
            public void onEnrollFailed() {
                sendFingerReturn(3);
                // showToast("请到设置中设置指纹");
//                returnFlag.invoke(3);
            }

            @Override
            public void onAuthenticationStart() {
                sendFingerReturn(4);
                // showToast("解锁开始");
//                returnFlag.invoke(4);
            }

            @Override
            public void onAuthenticationError(int errMsgId, CharSequence errString) {
                sendFingerReturn(5);
                // showToast("解锁失败");
//                returnFlag.invoke(5);
            }

            @Override
            public void onAuthenticationFailed() {
                sendFingerReturn(5);
                // showToast("解锁失败");
//                returnFlag.invoke(5);
            }

            @Override
            public void onAuthenticationHelp(int helpMsgId, CharSequence helpString) {
                // showToast(helpString.toString());
            }

            @Override
            public void onAuthenticationSucceeded(FingerprintManagerCompat.AuthenticationResult result) {
                sendFingerReturn(6);
                // showToast("解锁成功");
//                returnFlag.invoke(6);
            }
        });
    }

    @ReactMethod
    public void fingerPrintCancel() {
        FingerPrint.cancel();
    }

    @ReactMethod
    public void lockScreen() {
        PowerManager powerManager = (PowerManager)(activity.getSystemService(Context.POWER_SERVICE));
        wakeLock = powerManager.newWakeLock(PowerManager.SCREEN_BRIGHT_WAKE_LOCK, "My Tag");
        wakeLock.acquire();
    }

    @ReactMethod
    public void unlockScreen() {
        if (wakeLock != null) {
            wakeLock.release();
            wakeLock = null;
        }
    }

    @ReactMethod
    public void startChildApp(String pkg, String cls, String param, Callback callback) {
        try {
            ComponentName componet = new ComponentName(pkg, cls);
            Intent intent = new Intent();
            intent.setComponent(componet);
            intent.setAction("android.intent.action.MAIN");
            intent.putExtra("param", param);
            cordova.startActivityForResult((CordovaPlugin)this, intent, 0);
            this.callback = callback;
        } catch (Exception e) {
            callback.invoke(true);
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == 0) {
            callback.invoke(false);
        }
    }
}
