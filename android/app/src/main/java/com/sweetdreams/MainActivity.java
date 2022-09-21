package com.sweetdreams;

import java.util.Collections;
import java.util.List;
import java.util.ArrayList;
import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.reactlibrary.rnwifi.RNWifiModule;
import com.reactlibrary.rnwifi.RNWifiPackage;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SweetDreams";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the rendered you wish to use (Fabric or the older renderer).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate()  {
    return new RNWifiPackage.MainActivityDelegate(this, getMainComponentName());
  }

  public abstract static class RNWifiPackage implements ReactPackage {
      @Override
      public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
          List<NativeModule> modules = new ArrayList<>();
          modules.add(new RNWifiModule(reactContext));
          return modules;
      }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }
  }
}
}
