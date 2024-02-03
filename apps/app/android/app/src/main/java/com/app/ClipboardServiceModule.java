package com.app;
import android.util.Log;

import android.content.Intent;
import androidx.core.content.ContextCompat; // Make sure to import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ClipboardServiceModule extends ReactContextBaseJavaModule {
    public ClipboardServiceModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ClipboardService";
    }

    @ReactMethod
    public void startService() {
        Log.d("ClipboardService", "Starting Clipboard Listener Service");

        Intent serviceIntent = new Intent(getReactApplicationContext(), ClipboardListenerService.class);
        // Use ContextCompat.startForegroundService() to start your service
        ContextCompat.startForegroundService(getReactApplicationContext(), serviceIntent);
    }
}
