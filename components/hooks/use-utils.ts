import { useAuthContext } from "../util/context-user";
import { User } from "@/types/users";
export function useUtils() {
  const { user } = useAuthContext();

  const linkHref = typeof window !== "undefined" ? window.location.href : null;

  /** scroll to bottom */
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  /** End scroll to bottom */

  return {
    scrollToBottom,
    user: user as User,
    linkHref,
  };
}
