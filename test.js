package io.adjoe.sdk;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.ViewGroup;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import io.adjoe.sdk.AdjoeActivity;
import io.adjoe.sdk.C3164l2;
import io.adjoe.sdk.C3233z1;
import io.adjoe.sdk.SharedPreferencesProvider;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Timer;
import org.json.JSONObject;
import p000.ac7;
import p000.at6;
import p000.ku5;
import p000.mg4;
import p000.mv4;
import p000.nv6;
import p000.tq6;
import p000.ub0;
import p000.ud0;
import p000.v83;
import p000.ze3;
import p000.zm6;

/* loaded from: classes2.dex */
public class AdjoeActivity extends Activity {
    public static final int OPEN_INSTALLED_APPS = 11342049;
    public static final int OPEN_RECOMMENDED_APPS = 11342050;

    /* renamed from: m */
    private static final ByteArrayInputStream f17577m;

    /* renamed from: n */
    private static final Map<String, String> f17578n;

    /* renamed from: o */
    private static final WebResourceResponse f17579o;

    /* renamed from: b */
    WebView f17581b;

    /* renamed from: c */
    private AdjoeParams f17582c;

    /* renamed from: d */
    private boolean f17583d;

    /* renamed from: e */
    private int f17584e;

    /* renamed from: f */
    private RelativeLayout f17585f;

    /* renamed from: g */
    private ProgressBar f17586g;

    /* renamed from: h */
    private FrameLayout f17587h;

    /* renamed from: i */
    private AdjoePackageInstallReceiver f17588i;

    /* renamed from: j */
    private C3095d f17589j;

    /* renamed from: a */
    private final Timer f17580a = new Timer();

    /* renamed from: k */
    private boolean f17590k = false;

    /* renamed from: l */
    private boolean f17591l = false;

    /* renamed from: io.adjoe.sdk.AdjoeActivity$a */
    /* loaded from: classes2.dex */
    public class C3092a extends WebViewClient {

        /* renamed from: a */
        private boolean f17592a = false;

        /* renamed from: io.adjoe.sdk.AdjoeActivity$a$a */
        /* loaded from: classes2.dex */
        public class a implements Runnable {
            public a() {
            }

            @Override // java.lang.Runnable
            public final void run() {
                if (AdjoeActivity.this.f17585f.getVisibility() != 8) {
                    AdjoeActivity.this.f17585f.setVisibility(0);
                    AdjoeActivity.this.f17586g.setIndeterminate(true);
                    AdjoeActivity.this.f17581b.setVisibility(4);
                    AdjoeActivity.this.f17587h.setVisibility(4);
                }
            }
        }

        public C3092a() {
        }

        @Override // android.webkit.WebViewClient
        public final void onPageFinished(WebView webView, String str) {
            if (!this.f17592a) {
                C3135e1.m13452a("Offerwall opened.");
                AdjoeOfferwallListener adjoeOfferwallListener = Adjoe.f17549a;
                if (adjoeOfferwallListener != null) {
                    adjoeOfferwallListener.onOfferwallOpened("offerwall");
                }
                this.f17592a = true;
            }
            AdjoeActivity.this.f17587h.setVisibility(0);
            AdjoeActivity.this.f17581b.setVisibility(0);
            AdjoeActivity.this.f17585f.setVisibility(8);
        }

        @Override // android.webkit.WebViewClient
        public final void onPageStarted(WebView webView, String str, Bitmap bitmap) {
            AdjoeActivity.this.f17585f.setVisibility(4);
            AdjoeActivity.this.f17585f.postDelayed(new a(), 300L);
        }

        @Override // android.webkit.WebViewClient
        @TargetApi(21)
        public final void onReceivedHttpError(WebView webView, WebResourceRequest webResourceRequest, WebResourceResponse webResourceResponse) {
            if (webResourceRequest.getUrl().toString().startsWith("https://prod.adjoe.zone") && webResourceResponse.getStatusCode() == 406) {
                C3135e1.m13453a("AdjoeWebView", "Set user to fraud because request in WebView returned 406");
                int i = SharedPreferencesProvider.f17774e;
                new SharedPreferencesProvider.C3114c().m13416a("m", ac7.m267b(2)).m13420a(AdjoeActivity.this);
            }
        }

        @Override // android.webkit.WebViewClient
        @TargetApi(26)
        public final boolean onRenderProcessGone(WebView webView, RenderProcessGoneDetail renderProcessGoneDetail) {
            int rendererPriorityAtExit;
            boolean didCrash;
            int rendererPriorityAtExit2;
            boolean didCrash2;
            boolean z;
            StringBuilder m17972a = nv6.m17972a("main WebView onRenderProcessGone; rendererPriority: ");
            rendererPriorityAtExit = renderProcessGoneDetail.rendererPriorityAtExit();
            m17972a.append(rendererPriorityAtExit);
            m17972a.append(", did crash: ");
            didCrash = renderProcessGoneDetail.didCrash();
            m17972a.append(didCrash);
            C3135e1.m13464e("AdjoeActivity", m17972a.toString());
            C3212u0 m13772a = C3212u0.m13770b("webview").m13772a("WebView crash because render process is gone");
            rendererPriorityAtExit2 = renderProcessGoneDetail.rendererPriorityAtExit();
            C3212u0 m13773a = m13772a.m13773a("RendererPriority", rendererPriorityAtExit2);
            didCrash2 = renderProcessGoneDetail.didCrash();
            C3212u0 m13775a = m13773a.m13776a("DidCrash", didCrash2).m13775a("SubId1", AdjoeActivity.this.f17582c.f17636a).m13775a("SubId2", AdjoeActivity.this.f17582c.f17637b).m13775a("ua_network", AdjoeActivity.this.f17582c.f17636a).m13775a("ua_channel", AdjoeActivity.this.f17582c.f17637b).m13775a("ua_subpublisher_encrypted", AdjoeActivity.this.f17582c.f17638c).m13775a("ua_subpublisher_cleartext", AdjoeActivity.this.f17582c.f17639d).m13775a("placement", AdjoeActivity.this.f17582c.f17640e);
            if (AdjoeActivity.this.f17581b == null) {
                z = true;
            } else {
                z = false;
            }
            m13775a.m13776a("WebViewIsNull", z).m13775a("ChromeVersion", C3164l2.m13610c(AdjoeActivity.this)).m13779b();
            ((ViewGroup) webView.getParent()).removeView(webView);
            webView.destroy();
            AdjoeActivity adjoeActivity = AdjoeActivity.this;
            adjoeActivity.f17581b = null;
            adjoeActivity.f17581b = (WebView) adjoeActivity.findViewById(C3111R.id.webView);
            return true;
        }

        @Override // android.webkit.WebViewClient
        public final WebResourceResponse shouldInterceptRequest(WebView webView, String str) {
            if (AdjoeActivity.m13330d(str)) {
                return AdjoeActivity.m13317a(webView.getContext(), str);
            }
            if (AdjoeActivity.this.f17590k) {
                return AdjoeActivity.m13326b(str);
            }
            return null;
        }

        @Override // android.webkit.WebViewClient
        public final boolean shouldOverrideUrlLoading(WebView webView, String str) {
            AdjoeActivity.this.startActivity(new Intent("android.intent.action.VIEW", Uri.parse(str)));
            return true;
        }
    }

    /* renamed from: io.adjoe.sdk.AdjoeActivity$b */
    /* loaded from: classes2.dex */
    public class C3093b implements at6 {

        /* renamed from: a */
        final /* synthetic */ String f17595a;

        /* renamed from: b */
        final /* synthetic */ String f17596b;

        /* renamed from: c */
        final /* synthetic */ String f17597c;

        public C3093b(String str, String str2, String str3) {
            this.f17595a = str;
            this.f17596b = str2;
            this.f17597c = str3;
        }

        @Override // p000.at6
        public final void onError(Exception exc) {
            C3135e1.m13456a("unable to execute s2s Click", exc);
            AdjoeActivity.this.m13334a(this.f17596b, this.f17597c, this.f17595a, exc);
        }

        @Override // p000.at6
        public final void onSuccess(Object obj) {
            String str;
            C3186r1 c3186r1 = (C3186r1) obj;
            AdjoeActivity adjoeActivity = AdjoeActivity.this;
            String str2 = this.f17595a;
            adjoeActivity.getClass();
            try {
                C3155j1.m13563a(adjoeActivity).m13564a(c3186r1.m13722a(), str2);
                if (C3128c2.m13431a(adjoeActivity, c3186r1.m13723b())) {
                    str = "campaign_s2s_click";
                } else {
                    str = "campaign_s2s_click_no_playstore";
                }
                JSONObject jSONObject = new JSONObject();
                jSONObject.put("ClickAppId", str2);
                C3138f0.m13477e(adjoeActivity).m13493a((Context) adjoeActivity, str, "user", jSONObject, (JSONObject) null, (AdjoeParams) null, true);
            } catch (Exception e) {
                C3135e1.m13456a("AdjoeActivity", e);
            }
            adjoeActivity.runOnUiThread(new RunnableC3125c(adjoeActivity, str2));
        }
    }

    /* renamed from: io.adjoe.sdk.AdjoeActivity$c */
    /* loaded from: classes2.dex */
    public class RunnableC3094c implements Runnable {
        public RunnableC3094c() {
        }

        @Override // java.lang.Runnable
        public final void run() {
            AdjoeActivity.this.m13336c("document.onRefreshCampaign && document.onRefreshCampaign();");
        }
    }

    /* renamed from: io.adjoe.sdk.AdjoeActivity$d */
    /* loaded from: classes2.dex */
    public final class C3095d extends BroadcastReceiver {

        /* renamed from: io.adjoe.sdk.AdjoeActivity$d$a */
        /* loaded from: classes2.dex */
        public class a implements Runnable {

            /* renamed from: a */
            final /* synthetic */ long f17601a;

            /* renamed from: b */
            final /* synthetic */ long f17602b;

            public a(long j, long j2) {
                this.f17601a = j;
                this.f17602b = j2;
            }

            @Override // java.lang.Runnable
            public final void run() {
                AdjoeActivity.this.f17586g.setIndeterminate(false);
                AdjoeActivity.this.f17586g.setMax((int) this.f17601a);
                AdjoeActivity.this.f17586g.setProgress((int) this.f17602b);
            }
        }

        public C3095d() {
        }

        @Override // android.content.BroadcastReceiver
        public final void onReceive(Context context, Intent intent) {
            AdjoeActivity.this.runOnUiThread(new a(intent.getIntExtra("total", 0), intent.getIntExtra(v83.CATEGORY_PROGRESS, 0)));
        }
    }

    static {
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream("".getBytes());
        f17577m = byteArrayInputStream;
        f17578n = Collections.emptyMap();
        HashMap hashMap = new HashMap();
        hashMap.put("Access-Control-Allow-Origin", "*");
        hashMap.put("Access-Control-Allow-Headers", "*");
        f17579o = m13318a("text/plain", ze3.SUB_DOUBLE_2ADDR, "No content", hashMap, byteArrayInputStream);
    }

    public void notifyOfferwallClosed() {
        AdjoeOfferwallListener adjoeOfferwallListener;
        if (!this.f17591l && (adjoeOfferwallListener = Adjoe.f17549a) != null) {
            this.f17591l = true;
            adjoeOfferwallListener.onOfferwallClosed("offerwall");
        }
    }

    @Override // android.app.Activity
    public void onBackPressed() {
        WebView webView = this.f17581b;
        if (webView != null && webView.canGoBack()) {
            this.f17581b.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override // android.app.Activity
    @SuppressLint({"AddJavascriptInterface", "SetJavaScriptEnabled"})
    public final void onCreate(Bundle bundle) {
        boolean z;
        Context applicationContext = getApplicationContext();
        super.onCreate(bundle);
        C3135e1.m13452a("Launching AdjoeActivity for the offerwall.");
        try {
            requestWindowFeature(1);
            getWindow().setFlags(1024, 1024);
            SharedPreferencesProvider.C3116e m13395a = SharedPreferencesProvider.m13395a(this, new SharedPreferencesProvider.C3115d("config_ForceOrientation", "int"), new SharedPreferencesProvider.C3115d("ba", "boolean"), new SharedPreferencesProvider.C3115d("config_bundle_highlight_color", "string"), new SharedPreferencesProvider.C3115d("m", "int"), new SharedPreferencesProvider.C3115d("config_UseLegacyProtection", "boolean"));
            int m266a = ac7.m266a(m13395a.m13422a("m", 0));
            boolean m13425a = m13395a.m13425a("config_UseLegacyProtection");
            int m13422a = m13395a.m13422a("config_ForceOrientation", 0);
            if (m266a == 2 && !m13425a) {
                z = true;
            } else {
                z = false;
            }
            this.f17590k = z;
            if (m13422a == 1) {
                setRequestedOrientation(1);
            } else if (m13422a == 2) {
                setRequestedOrientation(0);
            }
            C3184q2.m13721a();
            m13321a(applicationContext, bundle, m13395a);
            if (Build.VERSION.SDK_INT >= 33 && ud0.checkSelfPermission(this, "android.permission.POST_NOTIFICATIONS") != 0) {
                requestPermissions(new String[]{"android.permission.POST_NOTIFICATIONS"}, 111);
            }
        } catch (Exception e) {
            C3135e1.m13456a("Pokemon", e);
            C3135e1.m13452a("An error occurred while launching AdjoeActivity for the offerwall.");
        }
    }

    @Override // android.app.Activity
    public final void onDestroy() {
        super.onDestroy();
        m13336c("document.onAndroidDestroy && document.onAndroidDestroy();");
        C3135e1.m13452a("Offerwall closed.");
        notifyOfferwallClosed();
    }

    public void onOfferwallRefresh() {
        runOnUiThread(new RunnableC3094c());
    }

    @Override // android.app.Activity
    public final void onPause() {
        super.onPause();
        m13336c("document.onAndroidPause && document.onAndroidPause();");
    }

    @Override // android.app.Activity
    public void onRequestPermissionsResult(int i, final String[] strArr, final int[] iArr) {
        if (i == 111) {
            tq6.m21603a().m21611a(zm6.IO, new Runnable() { // from class: u5
                @Override // java.lang.Runnable
                public final void run() {
                    AdjoeActivity.this.m13324a(strArr, iArr);
                }
            });
        }
    }

    @Override // android.app.Activity
    public final void onRestart() {
        super.onRestart();
        m13336c("document.onAndroidRestart && document.onAndroidRestart();");
    }

    @Override // android.app.Activity
    public final void onRestoreInstanceState(Bundle bundle) {
        super.onRestoreInstanceState(bundle);
        WebView webView = this.f17581b;
        if (webView != null) {
            webView.restoreState(bundle);
        }
    }

    @Override // android.app.Activity
    public void onResume() {
        super.onResume();
        try {
            if (this.f17588i == null) {
                this.f17588i = new AdjoePackageInstallReceiver();
            }
            IntentFilter intentFilter = new IntentFilter();
            intentFilter.addAction("android.intent.action.PACKAGE_ADDED");
            intentFilter.addDataScheme("package");
            C3135e1.m13453a("AdjoeActivity", "Register package install receiver");
            registerReceiver(this.f17588i, intentFilter);
        } catch (Exception e) {
            C3135e1.m13456a("Pokemon", e);
        }
        C3139f1.m13504a(this);
        m13336c("document.onAndroidResume && document.onAndroidResume();");
    }

    @Override // android.app.Activity
    public final void onSaveInstanceState(Bundle bundle) {
        super.onSaveInstanceState(bundle);
        WebView webView = this.f17581b;
        if (webView != null) {
            webView.saveState(bundle);
        }
    }

    @Override // android.app.Activity
    public final void onStart() {
        super.onStart();
        m13336c("document.onAndroidStart && document.onAndroidStart();");
    }

    @Override // android.app.Activity
    public void onStop() {
        super.onStop();
        try {
            if (this.f17588i != null) {
                C3135e1.m13453a("AdjoeActivity", "Unregister package install receiver");
                unregisterReceiver(this.f17588i);
            }
            if (this.f17589j != null) {
                C3135e1.m13453a("AdjoeActivity", "Unregister download progress receiver");
                unregisterReceiver(this.f17589j);
            }
        } catch (Exception e) {
            C3135e1.m13456a("Pokemon", e);
        }
        this.f17580a.cancel();
        m13336c("document.onAndroidStop && document.onAndroidStop();");
    }

    public void trackS2sClick(String str, String str2, String str3) {
        try {
            int i = C3164l2.f17958c;
            C3205s1.m13745a(this, str, str2, C3164l2.m13588a(System.currentTimeMillis()), new C3093b(str3, str, str2));
        } catch (Exception e) {
            m13334a(str, str2, str3, e);
        }
    }

    public void trackS2sView(String str, String str2, String str3) {
        try {
            JSONObject jSONObject = new JSONObject();
            jSONObject.put("ViewAppId", str3);
            int i = C3164l2.f17958c;
            C3205s1.m13744a(this, str, str2, C3164l2.m13588a(System.currentTimeMillis()));
            C3138f0.m13477e(this).m13493a((Context) this, "campaign_s2s_view", "user", jSONObject, (JSONObject) null, (AdjoeParams) null, true);
        } catch (Exception e) {
            C3212u0.m13770b("s2s_tracking").m13772a("Error executing Tracking link from offerwall").m13775a("s2sViewUrl", str).m13775a("creativeSetUUID", str2).m13777a(e).m13771a().m13779b();
        }
    }

    /* JADX WARN: Code restructure failed: missing block: B:28:0x007a, code lost:
    
        if (r1.equals("/v1/support/sdk") != false) goto L25;
     */
    /* renamed from: b */
    /*
        Code decompiled incorrectly, please refer to instructions dump.
        To view partially-correct code enable 'Show inconsistent code' option in preferences
    */
    public static android.webkit.WebResourceResponse m13326b(java.lang.String r4) {
        /*
            boolean r0 = io.adjoe.sdk.C3221w1.m13825a(r4)
            if (r0 == 0) goto La
            android.webkit.WebResourceResponse r4 = io.adjoe.sdk.AdjoeActivity.f17579o
            goto L88
        La:
            android.net.Uri r4 = android.net.Uri.parse(r4)     // Catch: java.lang.Exception -> L7e
            java.lang.String r0 = r4.getHost()     // Catch: java.lang.Exception -> L7e
            java.lang.String r1 = r4.getPath()     // Catch: java.lang.Exception -> L7e
            java.lang.String r4 = r4.getScheme()     // Catch: java.lang.Exception -> L7e
            java.lang.String[] r2 = new java.lang.String[]{r0, r1, r4}     // Catch: java.lang.Exception -> L7e
            boolean r2 = io.adjoe.sdk.C3221w1.m13826a(r2)     // Catch: java.lang.Exception -> L7e
            if (r2 == 0) goto L27
            android.webkit.WebResourceResponse r4 = io.adjoe.sdk.AdjoeActivity.f17579o     // Catch: java.lang.Exception -> L7e
            goto L88
        L27:
            java.util.Locale r2 = java.util.Locale.ROOT     // Catch: java.lang.Exception -> L7e
            java.lang.String r2 = r0.toLowerCase(r2)     // Catch: java.lang.Exception -> L7e
            java.lang.String r3 = "adjoe.zone"
            boolean r2 = r2.contains(r3)     // Catch: java.lang.Exception -> L7e
            if (r2 != 0) goto L36
            goto L7c
        L36:
            java.lang.String r2 = "https://prod.adjoe.zone"
            java.lang.StringBuilder r3 = new java.lang.StringBuilder     // Catch: java.lang.Exception -> L7e
            r3.<init>()     // Catch: java.lang.Exception -> L7e
            r3.append(r4)     // Catch: java.lang.Exception -> L7e
            java.lang.String r4 = "://"
            r3.append(r4)     // Catch: java.lang.Exception -> L7e
            r3.append(r0)     // Catch: java.lang.Exception -> L7e
            java.lang.String r4 = r3.toString()     // Catch: java.lang.Exception -> L7e
            boolean r4 = r2.equals(r4)     // Catch: java.lang.Exception -> L7e
            if (r4 == 0) goto L63
            java.lang.String r4 = "/v1/user/"
            boolean r4 = r1.startsWith(r4)     // Catch: java.lang.Exception -> L7e
            if (r4 == 0) goto L63
            java.lang.String r4 = "event"
            boolean r4 = r1.endsWith(r4)     // Catch: java.lang.Exception -> L7e
            if (r4 == 0) goto L63
            goto L7c
        L63:
            java.lang.String r4 = "/legal/"
            boolean r4 = r1.startsWith(r4)     // Catch: java.lang.Exception -> L7e
            if (r4 != 0) goto L7c
            java.lang.String r4 = "/revoke-consent"
            boolean r4 = r1.endsWith(r4)     // Catch: java.lang.Exception -> L7e
            if (r4 == 0) goto L74
            goto L7c
        L74:
            java.lang.String r4 = "/v1/support/sdk"
            boolean r4 = r1.equals(r4)     // Catch: java.lang.Exception -> L7e
            if (r4 == 0) goto L86
        L7c:
            r4 = 0
            goto L88
        L7e:
            r4 = move-exception
            java.lang.String r0 = "AdjoeActivity"
            java.lang.String r1 = "Exception in handling WebView Request."
            io.adjoe.sdk.C3135e1.m13462c(r0, r1, r4)
        L86:
            android.webkit.WebResourceResponse r4 = io.adjoe.sdk.AdjoeActivity.f17579o
        L88:
            return r4
        */
        throw new UnsupportedOperationException("Method not decompiled: io.adjoe.sdk.AdjoeActivity.m13326b(java.lang.String):android.webkit.WebResourceResponse");
    }

    /* JADX INFO: Access modifiers changed from: private */
    /* renamed from: d */
    public static boolean m13330d(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        try {
            URI uri = new URI(str);
            if (uri.isAbsolute() && !uri.isOpaque() && uri.getScheme().equals(ku5.HTTPS_SCHEME) && uri.getHost() != null && uri.getHost().equals("adjoeofferwallbundle.androidplatform.net")) {
                return !uri.getPath().contains("..");
            }
            return false;
        } catch (Exception e) {
            C3135e1.m13458b("AdjoeActivity", "validateRequestURL: Could not validate webview URL", e);
            return false;
        }
    }

    /* renamed from: c */
    public final void m13336c(String str) {
        if (str == null || this.f17581b == null) {
            return;
        }
        this.f17581b.evaluateJavascript("try {" + str + "} catch (err) {}", null);
    }

    /* renamed from: a */
    private static WebResourceResponse m13318a(String str, int i, String str2, Map<String, String> map, InputStream inputStream) {
        return new WebResourceResponse(str, "utf-8", i, str2, map, inputStream);
    }

    /* renamed from: a */
    public static WebResourceResponse m13317a(Context context, String str) {
        WebResourceResponse m13318a;
        if (!m13330d(str)) {
            return null;
        }
        try {
            String path = new URI(str).getPath();
            if (!path.startsWith(mg4.FORWARD_SLASH_STRING)) {
                path = mg4.FORWARD_SLASH_STRING + path;
            }
            File file = new File(C3164l2.f.m13643a(context) + path);
            if (!file.exists()) {
                m13318a = m13318a("text/plain", 404, "Not Found", f17578n, f17577m);
            } else {
                m13318a = m13318a(file.toURI().toURL().openConnection().getContentType(), 200, "OK", f17578n, new FileInputStream(file));
            }
            return m13318a;
        } catch (IOException e) {
            C3135e1.m13458b("AdjoeActivity", "handleBundleRequest: io exception.", e);
            return m13318a("text/plain", mv4.ERROR_UNKNOWN, "Internal Error", f17578n, f17577m);
        } catch (Exception e2) {
            C3135e1.m13458b("AdjoeActivity", "handleBundleRequest: exception.", e2);
            return null;
        }
    }

    /* JADX INFO: Access modifiers changed from: private */
    /* renamed from: a */
    public void m13324a(String[] strArr, int[] iArr) {
        for (int i = 0; i < strArr.length; i++) {
            String str = strArr[i];
            int i2 = iArr[i];
            if ("android.permission.POST_NOTIFICATIONS".equals(str)) {
                try {
                    C3138f0.m13477e(this).m13493a((Context) this, i2 == 0 ? "notification_permission_accepted" : "notification_permission_rejected", "user", (JSONObject) null, (JSONObject) null, (AdjoeParams) null, false);
                } catch (Exception e) {
                    C3135e1.m13462c("AdjoeActivity", "unable to send permission event", e);
                }
            }
        }
    }

    /* renamed from: a */
    public final void m13335a(String str, String str2, String str3, String str4, String str5, int i, C3233z1.c cVar) {
        C3233z1.m13847a(str, this.f17587h, str2, str3, str4, str5, i, cVar);
    }

    /* JADX WARN: Removed duplicated region for block: B:12:0x00e7  */
    /* JADX WARN: Removed duplicated region for block: B:15:0x0147  */
    /* JADX WARN: Removed duplicated region for block: B:19:0x0113  */
    @android.annotation.SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    /* renamed from: a */
    /*
        Code decompiled incorrectly, please refer to instructions dump.
        To view partially-correct code enable 'Show inconsistent code' option in preferences
    */
    private void m13321a(android.content.Context r9, android.os.Bundle r10, io.adjoe.sdk.SharedPreferencesProvider.C3116e r11) {
        /*
            Method dump skipped, instructions count: 355
            To view this dump change 'Code comments level' option to 'DEBUG'
        */
        throw new UnsupportedOperationException("Method not decompiled: io.adjoe.sdk.AdjoeActivity.m13321a(android.content.Context, android.os.Bundle, io.adjoe.sdk.SharedPreferencesProvider$e):void");
    }

    /* JADX INFO: Access modifiers changed from: private */
    /* JADX WARN: Can't fix incorrect switch cases order, some code will duplicate */
    /* renamed from: a */
    public void m13320a(Context context) {
        String str;
        char c;
        C3135e1.m13452a("Loading the offerwall.");
        WebView webView = this.f17581b;
        AdjoeParams adjoeParams = this.f17582c;
        int i = this.f17584e;
        boolean z = this.f17583d;
        try {
            str = context.getPackageManager().getApplicationLabel(context.getPackageManager().getApplicationInfo(context.getPackageName(), 0)).toString();
        } catch (PackageManager.NameNotFoundException unused) {
            str = "Adjoe";
        }
        SharedPreferencesProvider.C3116e m13395a = SharedPreferencesProvider.m13395a(context, new SharedPreferencesProvider.C3115d("c", "string"), new SharedPreferencesProvider.C3115d("h", "string"), new SharedPreferencesProvider.C3115d("bb", "string"), new SharedPreferencesProvider.C3115d("bc", "string"), new SharedPreferencesProvider.C3115d("f", "string"), new SharedPreferencesProvider.C3115d("g", "string"), new SharedPreferencesProvider.C3115d("i", "boolean"), new SharedPreferencesProvider.C3115d("aj", "string"));
        String m13424a = m13395a.m13424a("c", (String) null);
        String m13424a2 = m13395a.m13424a("h", (String) null);
        String m13424a3 = m13395a.m13424a("bb", (String) null);
        String m13424a4 = m13395a.m13424a("bc", (String) null);
        if (m13424a != null && m13424a2 != null) {
            Uri.Builder appendQueryParameter = Uri.parse("https://adjoeofferwallbundle.androidplatform.net/index.html").buildUpon().appendQueryParameter("adjoe-sdk-version", String.valueOf(Adjoe.getVersion())).appendQueryParameter("adjoe-sdk-pre-release-version", String.valueOf(1)).appendQueryParameter("adjoe-sdk-version-name", Adjoe.getVersionName()).appendQueryParameter("adjoe-android-api-level", String.valueOf(Build.VERSION.SDK_INT)).appendQueryParameter("adjoe-api-key", m13424a2).appendQueryParameter("adjoe-device-id", m13424a).appendQueryParameter("adjoe-device-id-hash", C3164l2.m13614d(m13424a)).appendQueryParameter("adjoe-base-url", "https://prod.adjoe.zone/v1").appendQueryParameter("adjoe-app-id", context.getPackageName()).appendQueryParameter("adjoe-app-name", str).appendQueryParameter("adjoe-app-version", String.valueOf(C3164l2.m13629m(context))).appendQueryParameter("adjoe-build", "release").appendQueryParameter("adjoe-bundle-version", String.valueOf(SharedPreferencesProvider.m13392a(context, "n", 0)));
            String str2 = adjoeParams.f17636a;
            if (str2 == null) {
                str2 = "";
            }
            Uri.Builder appendQueryParameter2 = appendQueryParameter.appendQueryParameter("adjoe-subid1", str2);
            String str3 = adjoeParams.f17637b;
            if (str3 == null) {
                str3 = "";
            }
            Uri.Builder appendQueryParameter3 = appendQueryParameter2.appendQueryParameter("adjoe-subid2", str3);
            String str4 = adjoeParams.f17636a;
            if (str4 == null) {
                str4 = "";
            }
            Uri.Builder appendQueryParameter4 = appendQueryParameter3.appendQueryParameter("adjoe-ua-network", str4);
            String str5 = adjoeParams.f17637b;
            if (str5 == null) {
                str5 = "";
            }
            Uri.Builder appendQueryParameter5 = appendQueryParameter4.appendQueryParameter("adjoe-ua-channel", str5);
            String str6 = adjoeParams.f17639d;
            if (str6 == null) {
                str6 = "";
            }
            Uri.Builder appendQueryParameter6 = appendQueryParameter5.appendQueryParameter("adjoe-ua-sub-publisher-cleartext", str6);
            String str7 = adjoeParams.f17638c;
            if (str7 == null) {
                str7 = "";
            }
            Uri.Builder appendQueryParameter7 = appendQueryParameter6.appendQueryParameter("adjoe-ua-sub-publisher-encrypted", str7);
            String str8 = adjoeParams.f17640e;
            Uri.Builder appendQueryParameter8 = appendQueryParameter7.appendQueryParameter("adjoe-placement", str8 != null ? str8 : "").appendQueryParameter("adjoe-device-type", C3164l2.m13619f(context)).appendQueryParameter("adjoe-device-name", Build.DEVICE).appendQueryParameter("adjoe-test-group", String.valueOf(C3164l2.m13608c(m13424a))).appendQueryParameter("adjoe-suppress-campaign-cutoff", String.valueOf(z)).appendQueryParameter("adjoe-jump-location", String.valueOf(i)).appendQueryParameter("adjoe-sdk-build-variant", ub0.COLLATION_STANDARD).appendQueryParameter("adjoe-user-uuid", m13395a.m13424a("f", (String) null));
            String language = Locale.getDefault().getLanguage();
            if (language != null) {
                switch (language.hashCode()) {
                    case 3201:
                        if (language.equals("de")) {
                            c = 0;
                            break;
                        }
                        c = 65535;
                        break;
                    case 3241:
                        if (language.equals("en")) {
                            c = 1;
                            break;
                        }
                        c = 65535;
                        break;
                    case 3246:
                        if (language.equals("es")) {
                            c = 2;
                            break;
                        }
                        c = 65535;
                        break;
                    case 3276:
                        if (language.equals("fr")) {
                            c = 3;
                            break;
                        }
                        c = 65535;
                        break;
                    default:
                        c = 65535;
                        break;
                }
                switch (c) {
                }
                webView.loadUrl(appendQueryParameter8.appendQueryParameter("adjoe-user-lang", language).appendQueryParameter("adjoe-external-user-id", m13395a.m13424a("g", (String) null)).appendQueryParameter("adjoe-tos-accepted", String.valueOf(m13395a.m13425a("i"))).appendQueryParameter("adjoe-gender", m13424a3).appendQueryParameter("adjoe-day-of-birth", m13424a4).appendQueryParameter("adjoe-target-sdk-version", String.valueOf(C3164l2.m13633q(context))).appendQueryParameter("adjoe-session-id", m13395a.m13424a("aj", (String) null)).appendQueryParameter("adjoe-sdk-wrapper", C3209t1.m13766a(context)).toString());
                return;
            }
            language = "en";
            webView.loadUrl(appendQueryParameter8.appendQueryParameter("adjoe-user-lang", language).appendQueryParameter("adjoe-external-user-id", m13395a.m13424a("g", (String) null)).appendQueryParameter("adjoe-tos-accepted", String.valueOf(m13395a.m13425a("i"))).appendQueryParameter("adjoe-gender", m13424a3).appendQueryParameter("adjoe-day-of-birth", m13424a4).appendQueryParameter("adjoe-target-sdk-version", String.valueOf(C3164l2.m13633q(context))).appendQueryParameter("adjoe-session-id", m13395a.m13424a("aj", (String) null)).appendQueryParameter("adjoe-sdk-wrapper", C3209t1.m13766a(context)).toString());
            return;
        }
        throw new AdjoeException("Encountered device error while loading offerwall.");
    }

    /* renamed from: a */
    public final void m13334a(String str, String str2, String str3, Exception exc) {
        try {
            C3212u0.m13770b("s2s_tracking").m13772a("Error executing Tracking link from offerwall").m13775a("s2sClickUrl", str).m13775a("creativeSetUUID", str2).m13777a(exc).m13771a().m13779b();
            C3128c2.m13431a(this, "market://details?id=" + str3);
            runOnUiThread(new RunnableC3125c(this, str3));
        } catch (Exception e) {
            C3135e1.m13456a("AdjoeActivity", e);
        }
    }
}
