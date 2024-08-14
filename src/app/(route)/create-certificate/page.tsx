"use client";

import { formSchema, formSchemaType } from "@/schemas/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Adjust paths as needed
import { Input } from "@/components/ui/input"; // Adjust path as needed
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { FaSpinner } from "react-icons/fa";
import { CreateCertificate } from "@/action/certificate";

export default function CreateCertificates() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderPrivateKey: "",
      ownerPublicKey: "",
      fullname: "",
      birthday: {
        day: 1,
        month: 1,
        year: 2000,
      },
      deliveryDate: {
        day: 1,
        month: 1,
        year: 2024,
      },
      serialId: "",
      securityCode: "123456",
      moreInfo: "",
      originalData: "",
      originalImage: "",
    },
  });

  async function onHandleSubmit(values: formSchemaType) {
    console.log(values);
    try {
      const url = new URL("http://localhost:8000/init-certificate");

      // Add query parameters
      url.searchParams.append("senderPrivateKey", values.senderPrivateKey);
      url.searchParams.append("ownerPublicKey", values.ownerPublicKey);

      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: values.fullname,
          birthday: values.birthday,
          delivery_date: values.deliveryDate,
          serial_id: values.serialId,
          security_code: values.securityCode,
          more_info: values.moreInfo,
          original_data: values.originalData,
          original_image: values.originalImage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Certificate created successfully:", data);
        // Handle success (e.g., display a success message, navigate to another page, etc.)
        toast({
          title: "Success",
          description: "Certificate created successfully.",
          variant: "default", // You can choose different variants like "destructive" if needed
        });
        await CreateCertificate(
          data.data.certificate_public_key,
          values.ownerPublicKey
        );
      } else {
        const errorData = await response.json();
        console.error("Error creating certificate:", errorData);
        // Handle validation errors or other server errors
        toast({
          title: "Error",
          description: `Failed to create certificate: ${
            errorData.detail || "Unknown error"
          }`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Request failed:", error);
      // Handle network or other unexpected errors
      toast({
        title: "Network Error",
        description: "Request failed. Please check your network connection.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-4">
      <div className="w-full h-fit flex flex-col items-center">
        <div className="text-4xl font-bold">Create Certificate</div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onHandleSubmit)}
            className="space-y-2 w-2/3 flex flex-col py-10"
          >
            <div className="w-full flex">
              <div className="w-1/2 px-4">
                <FormField
                  control={form.control}
                  name="senderPrivateKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender Private Key(BS58 String):</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownerPublicKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Public Key:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birthday:</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          onChange={(e) => {
                            const value = e.target.value;
                            console.log(e.target.value);
                            const date = new Date(value);
                            field.onChange({
                              day: date.getDate(),
                              month: date.getMonth() + 1,
                              year: date.getFullYear(),
                            });
                            console.log(field.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Date:</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          onChange={(e) => {
                            const value = e.target.value;
                            console.log(e.target.value);

                            const date = new Date(value);
                            field.onChange({
                              day: date.getDate(),
                              month: date.getMonth() + 1,
                              year: date.getFullYear(),
                            });
                            console.log(field.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="no-margin-top w-1/2 px-4">
                <FormField
                  control={form.control}
                  name="serialId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serial ID:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="securityCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Security Code:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="moreInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>More Information (Optional):</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="originalData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Data:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="originalImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Image URL:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the original image URL"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="px-4">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full mt-4"
              >
                {!form.formState.isSubmitting && (
                  <span>Create Certificate</span>
                )}
                {form.formState.isSubmitting && (
                  <FaSpinner className="animate-spin" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
