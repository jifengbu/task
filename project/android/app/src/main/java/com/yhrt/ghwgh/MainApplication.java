package com.yhrt.ghwgh;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.remobile.RCTRemobilePackage;
import com.remobile.camera.RCTCameraPackage;
import com.remobile.filetransfer.RCTFileTransferPackage;
import com.remobile.sqlite.RCTSqlitePackage;
import com.remobile.splashscreen.RCTSplashScreenPackage;
import com.remobile.toast.RCTToastPackage;
import com.remobile.update.RCTUpdateMgr;
import com.remobile.zip.RCTZipPackage;
import com.rnfs.RNFSPackage;
import com.beefe.picker.PickerViewPackage;

import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {
    private RCTUpdateMgr mUpdateMgr;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected String getJSBundleFile() {
            return mUpdateMgr.getBundleUrl();
        }

        @Override
        protected List<ReactPackage> getPackages() {
            mUpdateMgr = new RCTUpdateMgr(MainActivity.activity);

            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RCTRemobilePackage(MainActivity.activity),
                //RemobileLibraries
                new RCTSplashScreenPackage(MainActivity.activity, true),
                new RCTToastPackage(),
                new RCTZipPackage(),
                mUpdateMgr.getReactPackage(),
                new RCTCameraPackage(),
                new RCTFileTransferPackage(),
                new RCTSqlitePackage(),
                //VendorLibraries
                new RNFSPackage(),
                new PickerViewPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
