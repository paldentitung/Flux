import { useEffect, useRef, useState } from "react";
import { User, Lock, Bell, Shield, LogOut, Eye, EyeClosed } from "lucide-react";
import Avatar from "../components/ui/Avatar";
import LoadingButton from "../components/ui/LoadingButton";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";

type Section =
  | "profile"
  | "account"
  | "privacy"
  | "notifications"
  | "appearance";

const NAV: { id: Section; label: string; Icon: typeof User }[] = [
  { id: "profile", label: "Profile", Icon: User },
  { id: "account", label: "Account", Icon: Lock },
  { id: "privacy", label: "Privacy & blocking", Icon: Shield },
  { id: "notifications", label: "Notifications", Icon: Bell },
];

const SettingPage = () => {
  const { user, handleLogout } = useAuth();
  const [active, setActive] = useState<Section>("profile");
  const [toggles, setToggles] = useState({
    likes: true,
    follows: true,
    comments: true,
    mentions: false,
  });
  const {
    handleChangePassword,
    loading,
    handleToggleUserPrivary,
    blockedUsers,
    fetchBlockedUsers,
    handleUnBlockUser,
    handleUpdateProfile,
    handleRemoveAvatar,
    handleChangeAvatar,
  } = useProfile();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
  });

  const toggleShowPassword = (key: keyof typeof showPassword) =>
    setShowPassword((s) => ({ ...s, [key]: !s[key] }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleChangePassword(formData.currentPassword, formData.newPassword);
  };

  const toggle = (key: keyof typeof toggles) =>
    setToggles((t) => ({ ...t, [key]: !t[key] }));

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = () => {
    fileRef.current?.click();
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  return (
    <div
      style={{ fontFamily: "var(--font-body)" }}
      className="min-h-screen bg-(--background)"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <h1
          style={{ fontFamily: "var(--font-heading)" }}
          className="text-2xl text-(--foreground) mb-6"
        >
          Settings
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar nav */}
          <nav className="md:flex md:flex-col gap-1 overflow-x-auto grid grid-cols-3  md:overflow-visible md:w-56 shrink-0">
            {NAV.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition text-left ${
                  active === id
                    ? "bg-(--surface-hover) text-(--foreground)"
                    : "text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--surface-hover)"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition text-left mt-2 md:mt-4"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </nav>

          {/* Content */}
          <div className="flex-1 rounded-2xl border border-(--post-card-border) bg-(--post-card-bg) p-6">
            {active === "profile" && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2
                    style={{ fontFamily: "var(--font-heading)" }}
                    className="text-lg text-(--foreground) mb-1"
                  >
                    Profile information
                  </h2>
                  <p className="text-sm text-(--muted-foreground)">
                    This is how others see you on Flux.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Avatar
                    src={user?.avatar}
                    name={user?.name || user?.username}
                    size={64}
                  />
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={fileRef}
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleChangeAvatar(file);
                        }
                      }}
                    />
                    <LoadingButton
                      onClick={handleFile}
                      className="px-4 py-2 rounded-lg text-sm font-medium border border-(--post-card-border) text-(--foreground) hover:bg-(--surface-hover) transition"
                    >
                      Change photo
                    </LoadingButton>
                    <button
                      onClick={() => {
                        window.confirm("are you sure");
                        handleRemoveAvatar();
                      }}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-(--muted-foreground) hover:text-red-500 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* <Field
                    label="Name"
                    defaultValue={user?.name ?? ""}
                    placeholder="Your name"
                  />
                  <Field
                    label="Username"
                    defaultValue={user?.username ?? ""}
                    placeholder="username"
                  /> */}
                </div>

                <div>
                  <label className="text-sm font-medium text-(--foreground) mb-1.5 block">
                    Name
                  </label>
                  <input
                    placeholder="Name"
                    className="input-auth"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <label className="text-sm font-medium text-(--foreground) mb-1.5 block">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Bio"
                    className="input-auth resize-none"
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex justify-end">
                  <LoadingButton
                    onClick={() => handleUpdateProfile(profileData)}
                    className="px-5 py-2 rounded-lg text-sm font-semibold bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition"
                  >
                    Save changes
                  </LoadingButton>
                </div>
              </div>
            )}

            {active === "account" && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2
                    style={{ fontFamily: "var(--font-heading)" }}
                    className="text-lg text-(--foreground) mb-1"
                  >
                    Account
                  </h2>
                  <p className="text-sm text-(--muted-foreground)">
                    Manage your email and password.
                  </p>
                </div>

                <div className="border-t border-(--post-card-border) pt-5">
                  <h3 className="text-sm font-semibold text-(--foreground) mb-3">
                    Change password
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Current password"
                      type={showPassword.currentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      showToggle
                      isVisible={showPassword.currentPassword}
                      onToggleVisibility={() =>
                        toggleShowPassword("currentPassword")
                      }
                    />

                    <Field
                      label="New password"
                      type={showPassword.newPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      showToggle
                      isVisible={showPassword.newPassword}
                      onToggleVisibility={() =>
                        toggleShowPassword("newPassword")
                      }
                    />

                    <Field
                      label="Confirm new password"
                      type={showPassword.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      showToggle
                      isVisible={showPassword.confirmPassword}
                      onToggleVisibility={() =>
                        toggleShowPassword("confirmPassword")
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <LoadingButton
                    onClick={submitChangePassword}
                    loading={loading}
                    loadingText="Changing…"
                    className="px-5 py-2 rounded-lg text-sm font-semibold bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90 transition"
                  >
                    Update account
                  </LoadingButton>
                </div>

                <div className="border-t border-(--post-card-border) pt-5">
                  <h3 className="text-sm font-semibold text-red-500 mb-1">
                    Delete account
                  </h3>
                  <p className="text-sm text-(--muted-foreground) mb-3">
                    Permanently remove your account and all of its content.
                  </p>
                  <button className="px-4 py-2 rounded-lg text-sm font-medium border border-red-400/40 text-red-500 hover:bg-red-500/10 transition">
                    Delete my account
                  </button>
                </div>
              </div>
            )}

            {active === "privacy" && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2
                    style={{ fontFamily: "var(--font-heading)" }}
                    className="text-lg text-(--foreground) mb-1"
                  >
                    Privacy & blocking
                  </h2>
                  <p className="text-sm text-(--muted-foreground)">
                    Control who can see and interact with you.
                  </p>
                </div>

                <ToggleRow
                  label="Private account"
                  description="Only people you approve can see your posts and follow you"
                  checked={user?.isPrivate ?? false}
                  onChange={handleToggleUserPrivary}
                />

                <div className="border-t border-(--post-card-border) pt-5">
                  <h3 className="text-sm font-semibold text-(--foreground) mb-1">
                    Blocked accounts
                  </h3>
                  <p className="text-sm text-(--muted-foreground) mb-3">
                    Blocked accounts can't view your profile or contact you.
                  </p>

                  {blockedUsers.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {blockedUsers.map((b) => (
                        <div
                          key={b._id}
                          className="flex items-center gap-3 py-2.5"
                        >
                          <Avatar src={b.avatar} name={b.name} size={36} />

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-(--foreground) truncate">
                              {b.name}
                            </p>
                            <p className="text-xs text-(--muted-foreground)">
                              @{b.username}
                            </p>
                          </div>

                          <LoadingButton
                            loading={loading}
                            loadingText="Unblocking…"
                            onClick={() => handleUnBlockUser(b._id)}
                            className="text-xs px-3 py-1.5 rounded-lg border border-(--post-card-border) text-(--foreground) hover:bg-(--surface-hover) transition"
                          >
                            Unblock
                          </LoadingButton>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-sm text-(--muted-foreground)">
                        You haven’t blocked anyone yet
                      </p>
                      <p className="text-xs text-(--muted-foreground) mt-1">
                        Blocked users will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {active === "notifications" && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2
                    style={{ fontFamily: "var(--font-heading)" }}
                    className="text-lg text-(--foreground) mb-1"
                  >
                    Notification preferences
                  </h2>
                  <p className="text-sm text-(--muted-foreground)">
                    Choose what you get notified about.
                  </p>
                </div>

                <ToggleRow
                  label="Likes"
                  description="When someone likes your post"
                  checked={toggles.likes}
                  onChange={() => toggle("likes")}
                />
                <ToggleRow
                  label="New followers"
                  description="When someone starts following you"
                  checked={toggles.follows}
                  onChange={() => toggle("follows")}
                />
                <ToggleRow
                  label="Comments"
                  description="When someone comments on your post"
                  checked={toggles.comments}
                  onChange={() => toggle("comments")}
                />
                <ToggleRow
                  label="Mentions"
                  description="When someone mentions you in a comment"
                  checked={toggles.mentions}
                  onChange={() => toggle("mentions")}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  placeholder,
  type = "text",
  name,
  onChange,
  showToggle = false,
  isVisible = false,
  onToggleVisibility,
}: {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
}) => (
  <div>
    <label className="text-sm font-medium text-(--foreground) mb-1.5 block">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-auth ${showToggle ? "pr-10" : ""}`}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-(--muted-foreground) hover:text-(--foreground) transition"
        >
          {isVisible ? <EyeClosed size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  </div>
);

const ToggleRow = ({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <div className="flex items-center justify-between gap-4 py-1">
    <div className="min-w-0">
      <p className="text-sm font-medium text-(--foreground)">{label}</p>
      <p className="text-xs text-(--muted-foreground) mt-0.5">{description}</p>
    </div>
    <button
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className="relative w-10 h-5.5 rounded-full transition shrink-0"
      style={{
        background: checked ? "hsl(var(--primary))" : "var(--surface-hover)",
      }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform"
        style={{ transform: checked ? "translateX(18px)" : "translateX(0)" }}
      />
    </button>
  </div>
);

export default SettingPage;
