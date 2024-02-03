package com.app;

import android.content.ClipboardManager;
import android.content.Context;
import android.content.ClipData;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class ClipboardModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    ClipboardModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "ClipboardTest";
    }

    @ReactMethod
    public void watchClipboard(Promise promise) {
        ClipboardManager clipboard = (ClipboardManager) reactContext.getSystemService(Context.CLIPBOARD_SERVICE);
        clipboard.addPrimaryClipChangedListener(new ClipboardManager.OnPrimaryClipChangedListener() {
            @Override
            public void onPrimaryClipChanged() {
                ClipData clip = clipboard.getPrimaryClip();
                if (clip != null && clip.getItemCount() > 0) {
                    CharSequence text = clip.getItemAt(0).getText();
                    // Here, you can call a method to send text to your server
                    // Or use a React Native event to send it back to JavaScript
                }
            }
        });
        promise.resolve(null);
    }
}
