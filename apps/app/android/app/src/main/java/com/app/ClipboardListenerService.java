package com.app;

import android.content.Intent;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.content.ClipData;

import android.util.Log;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.content.ClipboardManager;
import android.content.Context;
import androidx.core.app.NotificationCompat;
import com.app.R;

public class ClipboardListenerService extends Service {
    private ClipboardManager clipboardManager;

    @Override
    public void onCreate() {
        super.onCreate();
        startForegroundService();
        clipboardManager = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
        clipboardManager.addPrimaryClipChangedListener(this::onPrimaryClipChanged);
    }

private void onPrimaryClipChanged() {
    if (clipboardManager.hasPrimaryClip() && clipboardManager.getPrimaryClip().getItemCount() > 0) {
        ClipData.Item item = clipboardManager.getPrimaryClip().getItemAt(0);
        if (item != null && item.getText() != null) {
            CharSequence clipText = item.getText();
            Log.d("ClipboardService", "Clip changed: " + clipText);
        } else {
            // Handle non-text data or continue silently
        }
    }
}


private void startForegroundService() {
    // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        CharSequence name = "Clip";
        String description = "Clip";
        int importance = NotificationManager.IMPORTANCE_DEFAULT;
        NotificationChannel channel = new NotificationChannel("CHANNEL_ID", name, importance);
        channel.setDescription(description);
        // Register the channel with the system
        NotificationManager notificationManager = getSystemService(NotificationManager.class);
        notificationManager.createNotificationChannel(channel);
    // }

    NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "CHANNEL_ID")
            .setContentTitle("Clipboard Service")
            .setContentText("Listening to clipboard changes")
            // .setSmallIcon(R.drawable.ic_notification)
            // You can add more settings to the builder here if needed
            ;

    startForeground(1, builder.build());
}

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
