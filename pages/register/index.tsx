import { useForm } from "@/components/hooks";
import { LayoutAuth } from "@/components/layouts/auth";
import { AlertDescriptionInput } from "@/components/ui-setting/alert-description-input";
import { ButtonInput } from "@/components/ui-setting/button-input";
import { FieldTextInput } from "@/components/ui-setting/shadcn-field";
import { Card } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { PublicComponent } from "@/components/util/public-component";
import { config } from "@/config";
import { PasswordResetUserAPI } from "@/endpoints/users";
import { AlertSuccessNotification } from "@/utils/alert-notification";
import Link from "next/link";
import { useRouter } from "next/router";
import { z } from "zod";

const schema = z.object({
  email: z
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols"),
});

const Register = () => {
  const { query } = useRouter();
  const { redirect } = query;

  const { isPending, isError, isSuccess, error, mutateAsync } =
    PasswordResetUserAPI();

  const form = useForm<z.infer<typeof schema>>({
    ZodType: schema as z.ZodType<
      z.infer<typeof schema>,
      z.infer<typeof schema>
    >,
    handleSubmit: async ({ email }) => {
      await mutateAsync({
        origin: config.url.public || "",
        email: email.toLowerCase(),
      });
      form.reset();
      AlertSuccessNotification({
        description: "Email send successfully",
      });
    },
    defaultValues: {
      email: "",
    },
  });

  return (
    <LayoutAuth title="Register">
      <div className="mt-8 flow-root">
        <Card className="mx-auto w-full max-w-sm p-4 shadow-none">
          <form onSubmit={form.onSubmit}>
            <FieldGroup className="gap-2">
              <div className="mx-auto flex justify-center">
                <h6 className="text-center text-xl font-bold">{`Inscrizione`}</h6>
              </div>
              {isError && (
                <AlertDescriptionInput
                  type="error"
                  message={error?.response?.data?.message}
                />
              )}

              {isSuccess && (
                <AlertDescriptionInput
                  type="info"
                  className="my-2 text-center"
                  message={"We sent a link recovery to your email"}
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

              <Field orientation="horizontal" className="mt-2">
                <ButtonInput
                  type="submit"
                  className="w-full"
                  variant="default"
                  loading={isPending}
                  disabled={!form.isValid}
                >
                  Request Password Reset
                </ButtonInput>
              </Field>
            </FieldGroup>
          </form>

          <Link href={`/login${redirect ? `?redirect=${redirect}` : ""}`}>
            <p className="cursor-pointer text-center text-xs font-bold text-primary hover:underline">
              Already have an account? Log in here
            </p>
          </Link>
        </Card>
      </div>
    </LayoutAuth>
  );
};

export default PublicComponent(Register);
