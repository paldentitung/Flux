import { useEffect, useRef, useState } from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  LogOut,
  Eye,
  EyeClosed,
  Trash2,
  Camera,
  ChevronRight,
} from "lucide-react";
import Avatar from "../../../shared/components/ui/Avatar";
import LoadingButton from "../../../shared/components/ui/LoadingButton";
import { useAuth } from "../../auth/hooks/useAuth";
import { useProfile } from "../../profile/hooks/useProfile";

type Section = "profile" | "account" | "privacy" | "notifications";

const NAV: { id: Section; label: string; Icon: typeof User }[] = [
  { id: "profile", label: "Profile", Icon: User },
  { id: "account", label: "Account", Icon: Lock },
  { id: "privacy", label: "Privacy & blocking", Icon: Shield },
  { id: "notifications", label: "Notifications", Icon: Bell },
];

const SettingPage = () => {
  const { user, handleLogout } = useAuth();
  const [active, setActive] = useState<Section | null>(null);
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

  const { handleNotificationPreferences } = useProfile();

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

  const [notifs, setNotifs] = useState({
    follow: user?.notificationPreferences?.follow ?? true,
    follow_request: user?.notificationPreferences?.follow_request ?? true,
    follow_request_accepted:
      user?.notificationPreferences?.follow_request_accepted ?? true,
    comment: user?.notificationPreferences?.comment ?? true,
    like: user?.notificationPreferences?.like ?? true,
  });

  const toggleShowPassword = (key: keyof typeof showPassword) =>
    setShowPassword((s) => ({ ...s, [key]: !s[key] }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleChangePassword(formData.currentPassword, formData.newPassword);
  };

  const toggle = (key: keyof typeof toggles) =>
    setToggles((t) => ({ ...t, [key]: !t[key] }));

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBlockedUsers();
    if (window.innerWidth >= 768) setActive("profile");
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {(active === null || !isMobile) && (
          <h1 className="text-2xl font-semibold text-white mb-5 tracking-tight">
            Settings
          </h1>
        )}

        {active !== null && (
          <button
            onClick={() => setActive(null)}
            className="md:hidden flex items-center gap-1.5 text-sm text-zinc-400 mb-4 hover:text-white transition"
          >
            ← Back
          </button>
        )}

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Sidebar / Mobile menu */}
          <nav
            className={`md:flex md:flex-col md:gap-1 md:w-52 md:shrink-0 ${
              active !== null ? "hidden md:flex" : "flex flex-col"
            }`}
          >
            {/* Mobile list */}
            <div className="md:hidden flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
              {NAV.map(({ id, label, Icon }, i) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-left transition hover:bg-zinc-800 text-zinc-100 ${
                    i !== NAV.length - 1 ? "border-b border-zinc-800" : ""
                  }`}
                >
                  <Icon size={16} className="text-zinc-400" />
                  <span className="flex-1">{label}</span>
                  <ChevronRight size={15} className="text-zinc-500" />
                </button>
              ))}
              <button
                onClick={() => {
                  if (window.confirm("Are you sure?")) handleLogout();
                }}
                className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition text-left"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:flex md:flex-col md:gap-0.5">
              {NAV.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition text-left ${
                    active === id
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
              <button
                onClick={() => {
                  if (window.confirm("Are you sure?")) handleLogout();
                }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition text-left mt-3"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          </nav>

          {/* Content panel */}
          {active !== null && (
            <div className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:p-6">
              <div className="mb-5">
                <h2 className="text-base font-semibold text-white">
                  {NAV.find((n) => n.id === active)?.label}
                </h2>
              </div>

              {/* ── Profile ── */}
              {active === "profile" && (
                <div className="flex flex-col gap-5">
                  <p className="text-sm text-zinc-400 -mt-3">
                    This is how others see you on Flux.
                  </p>

                  <div className="flex items-center gap-4">
                    <Avatar
                      src={user?.avatar}
                      name={user?.name || user?.username}
                      size={64}
                    />
                    <div className="flex flex-wrap gap-2">
                      <input
                        type="file"
                        ref={fileRef}
                        hidden
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleChangeAvatar(file);
                        }}
                      />
                      <LoadingButton
                        onClick={() => fileRef.current?.click()}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition"
                      >
                        <Camera size={15} />
                        Change photo
                      </LoadingButton>
                      <button
                        onClick={() => {
                          if (window.confirm("Remove your avatar?"))
                            handleRemoveAvatar();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-sm font-medium text-zinc-300 mb-1.5 block">
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
                    </div>
                    <div>
                      <label className="text-sm font-medium text-zinc-300 mb-1.5 block">
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
                  </div>

                  <div className="flex justify-end">
                    <LoadingButton
                      onClick={() => handleUpdateProfile(profileData)}
                      className="px-5 py-2 rounded-lg text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition"
                    >
                      Save changes
                    </LoadingButton>
                  </div>
                </div>
              )}

              {/* ── Account ── */}
              {active === "account" && (
                <div className="flex flex-col gap-5">
                  <p className="text-sm text-zinc-400 -mt-3">
                    Manage your email and password.
                  </p>

                  <div className="border-t border-zinc-800 pt-5">
                    <h3 className="text-sm font-semibold text-zinc-200 mb-3">
                      Change password
                    </h3>
                    <div className="flex flex-col gap-4">
                      <Field
                        label="Current password"
                        type={
                          showPassword.currentPassword ? "text" : "password"
                        }
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
                        type={
                          showPassword.confirmPassword ? "text" : "password"
                        }
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
                      className="px-5 py-2 rounded-lg text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition"
                    >
                      Update password
                    </LoadingButton>
                  </div>

                  <div className="border-t border-zinc-800 pt-5">
                    <h3 className="text-sm font-semibold text-red-400 mb-1">
                      Delete account
                    </h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      Permanently remove your account and all of its content.
                    </p>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium border border-red-500/30 text-red-400 hover:bg-red-500/10 transition">
                      Delete my account
                    </button>
                  </div>
                </div>
              )}

              {/* ── Privacy ── */}
              {active === "privacy" && (
                <div className="flex flex-col gap-5">
                  <p className="text-sm text-zinc-400 -mt-3">
                    Control who can see and interact with you.
                  </p>

                  <ToggleRow
                    label="Private account"
                    description="Only people you approve can see your posts and follow you"
                    checked={user?.isPrivate ?? false}
                    onChange={handleToggleUserPrivary}
                  />

                  <div className="border-t border-zinc-800 pt-5">
                    <h3 className="text-sm font-semibold text-zinc-200 mb-1">
                      Blocked accounts
                    </h3>
                    <p className="text-sm text-zinc-400 mb-3">
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
                              <p className="text-sm font-medium text-zinc-100 truncate">
                                {b.name}
                              </p>
                              <p className="text-xs text-zinc-400">
                                @{b.username}
                              </p>
                            </div>
                            <LoadingButton
                              loading={loading}
                              loadingText="Unblocking…"
                              onClick={() => handleUnBlockUser(b._id)}
                              className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition"
                            >
                              Unblock
                            </LoadingButton>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-sm text-zinc-400">
                          You haven't blocked anyone yet
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          Blocked users will appear here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── Notifications ── */}
              {active === "notifications" && (
                <div className="flex flex-col gap-5">
                  <p className="text-sm text-zinc-400 -mt-3">
                    Choose what you get notified about.
                  </p>
                  <ToggleRow
                    label="Likes"
                    description="When someone likes your post"
                    checked={notifs.like}
                    onChange={() => {
                      const updated = {
                        ...notifs,
                        like: !notifs.like,
                      };

                      setNotifs(updated);
                      handleNotificationPreferences(updated);
                    }}
                  />

                  <ToggleRow
                    label="New followers"
                    description="When someone starts following you"
                    checked={notifs.follow}
                    onChange={() => {
                      const updated = {
                        ...notifs,
                        follow: !notifs.follow,
                      };

                      setNotifs(updated);
                      handleNotificationPreferences(updated);
                    }}
                  />

                  <ToggleRow
                    label="Comments"
                    description="When someone comments on your post"
                    checked={notifs.comment}
                    onChange={() => {
                      const updated = {
                        ...notifs,
                        comment: !notifs.comment,
                      };

                      setNotifs(updated);
                      handleNotificationPreferences(updated);
                    }}
                  />

                  <ToggleRow
                    label="Follow Requests"
                    description="When someone send follow request"
                    checked={notifs.follow_request_accepted}
                    onChange={() => {
                      const updated = {
                        ...notifs,
                        follow_request_accepted:
                          !notifs.follow_request_accepted,
                      };

                      setNotifs(updated);
                      handleNotificationPreferences(updated);
                    }}
                  />
                </div>
              )}
            </div>
          )}
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
    <label className="text-sm font-medium text-zinc-300 mb-1.5 block">
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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-100 transition"
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
      <p className="text-sm font-medium text-zinc-100">{label}</p>
      <p className="text-xs text-zinc-400 mt-0.5">{description}</p>
    </div>
    <button
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${
        checked ? "bg-violet-600" : "bg-zinc-700"
      }`}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200"
        style={{ transform: checked ? "translateX(16px)" : "translateX(0)" }}
      />
    </button>
  </div>
);

export default SettingPage;
