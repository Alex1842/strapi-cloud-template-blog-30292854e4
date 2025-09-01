export default {
  register(app) {
    app.getPlugin("content-manager").injectComponent("listView", "actions", {
      name: "DeployButton",
      Component: () => (
        <button
          style={{
            padding: "0px 1rem",
            height: "3.2rem",
            border: "1px solid rgb(73, 69, 255)",
            background: "rgb(73, 69, 255)",
            color: "rgb(255, 255, 255)",
            borderRadius: "2.4rem",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "14px",
            margin: "-97px 2vw 0 0",
          }}
          onClick={async () => {
            try {
              const res = await fetch("/api/github-trigger", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              if (res.ok) {
                alert("✅ GitHub build triggered!");
              } else {
                alert("❌ Trigger failed!");
              }
            } catch {
              alert("⚠️ Network error");
            }
          }}
        >
          🚀 Deploy to GitHub
        </button>
      ),
    });
    const CM_ROOT = '/admin/content-manager';
    const TARGET =
      '/admin/content-manager/collection-types/api::blog-post.blog-post';

    if (location.pathname === CM_ROOT) {
      location.replace(TARGET);
    }

    if (!(window as any).__cmRedirectBound) {
      (window as any).__cmRedirectBound = true;
      document.addEventListener('click', (e) => {
        const a = (e.target as HTMLElement)?.closest?.('a');
        if (!a) return;
        const href = a.getAttribute('href');
        if (href === CM_ROOT) {
          e.preventDefault();
          window.history.pushState({}, '', TARGET);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      });
    }
  },
};
