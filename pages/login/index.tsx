import { useForm } from "@/components/hooks";
import { LoginUserAPI } from "@/endpoints/users";
import { LayoutAuth } from "@/components/layouts/auth";
import { ButtonInput } from "@/components/ui-setting";
import { AlertDescriptionInput } from "@/components/ui-setting/alert-description-input";
import {
  FieldTextInput,
  FieldTextPasswordInput,
} from "@/components/ui-setting/shadcn-field";
import { Card } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { config } from "@/config";
import { AlertSuccessNotification } from "@/utils/alert-notification";
import Link from "next/link";
import { useRouter } from "next/router";
import { z } from "zod";

const schema = z.object({
  email: z
    .email("wrong email format")
    .min(3, "minimum 3 symbols")
    .max(50, "maximum 50 symbols"),
  password: z
    .string()
    .min(8, "minimum 8 symbols")
    .max(50, "maximum 50 symbols"),
});

const Login = () => {
  const { query, push } = useRouter();
  const { redirect } = query;
  const redirectPath = Array.isArray(redirect) ? redirect[0] : redirect;

  const {
    error: errorLogin,
    isError: isErrorLogin,
    isPending: isPendingLogin,
    mutateAsync: loginUserMutation,
  } = LoginUserAPI();
  const form = useForm<z.infer<typeof schema>>({
    ZodType: schema as z.ZodType<
      z.infer<typeof schema>,
      z.infer<typeof schema>
    >,
    handleSubmit: async ({ email, password }) => {
      await loginUserMutation({
        password,
        email: email.toLowerCase(),
      });
      if (redirectPath) {
        await push(redirectPath);
      } else {
        await push(`/dashboard`);
        window.location.reload();
      }
      AlertSuccessNotification({
        description: "Login successfully",
      });
    },
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <LayoutAuth title="Login">
      <div className="mt-8 flow-root">
        <Card className="mx-auto w-full max-w-sm p-4 shadow-none">
          <form onSubmit={form.onSubmit}>
            <FieldGroup className="gap-2">
              <div className="mx-auto mt-4 flex justify-center">
                <h6 className="text-center text-xl font-bold">Login</h6>
              </div>
              {isErrorLogin && (
                <AlertDescriptionInput
                  type="error"
                  message={errorLogin?.response?.data?.message}
                />
              )}

              <FieldTextInput
                control={form.control}
                label="Email"
                type="email"
                name="email"
                placeholder="Email"
                isRequired
              />

              <FieldTextPasswordInput
                control={form.control}
                label="Password"
                name="password"
                placeholder="Password"
                isRequired
                fieldDescription={
                  <span className="block w-full text-right">
                    <Link
                      className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                      href={`/forgot-password${redirect ? `?redirect=${redirect}` : ""}`}
                    >
                      Forgot password?
                    </Link>
                  </span>
                }
              />
              <Field orientation="horizontal" className="mt-2">
                <ButtonInput
                  size="lg"
                  type="submit"
                  className="w-full"
                  variant="default"
                  loading={isPendingLogin}
                  disabled={!form.isValid}
                >
                  Log In
                </ButtonInput>
              </Field>
            </FieldGroup>
          </form>

          <p className="cursor-pointer text-center text-sm text-gray-600">
            Nuovo utente {config.company.name}?{" "}
            <Link
              className="text-primary underline"
              href={`/register${redirect ? `?redirect=${redirect}` : ""}`}
            >
              <span className="font-bold">Registrati qui</span>
            </Link>
          </p>
        </Card>
      </div>
    </LayoutAuth>
  );
};

export default Login;
