"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GetCertificateDataSchemaType,
  getCertificateDataSchema,
} from "@/schemas/form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function GetCertificate() {
  const [certificateData, setCertificateData] = useState<any>(null);
  const form = useForm<GetCertificateDataSchemaType>({
    resolver: zodResolver(getCertificateDataSchema),
    defaultValues: {
      cert_public_key: "",
    },
  });

  async function onHandleSubmit(values: GetCertificateDataSchemaType) {
    try {
      const url = new URL("http://localhost:8000/get-certificate-data");

      // Add query parameters
      url.searchParams.append("cert_public_key", values.cert_public_key);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Certificate Data:", data);
        setCertificateData(data.data);
        toast({
          title: "Success",
          description: "Certificate data retrieved successfully.",
          variant: "default",
        });
        // You can further process the certificate data or display it on the UI as needed
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: `Failed to retrieve certificate data: ${
            errorData.detail || "Unknown error"
          }`,
          variant: "destructive",
        });
      }
    } catch (error) {
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
        <div className="text-4xl font-bold">Get Certificate Data</div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onHandleSubmit)}
            className="space-y-4 w-2/3 flex py-10"
          >
            <div className="w-3/4">
              <FormField
                control={form.control}
                name="cert_public_key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Public Key:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Certificate Public Key"
                        className="outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/4">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full mt-4"
              >
                {!form.formState.isSubmitting && (
                  <span>Get Certificate Data</span>
                )}
                {form.formState.isSubmitting && (
                  <FaSpinner className="animate-spin" />
                )}
              </Button>
            </div>
          </form>
        </Form>

        {certificateData && (
          <div className="mt-4 p-4 rounded-lg w-2/3 bg-secondary">
            <h3 className="text-2xl font-bold mb-4">Certificate Data:</h3>
            <p>
              <strong>Sender:</strong> {certificateData.sender}
            </p>
            <p>
              <strong>Owner:</strong> {certificateData.owner}
            </p>
            <p>
              <strong>Full Name:</strong> {certificateData.fullname}
            </p>
            <p>
              <strong>Birthday:</strong> {certificateData.birthday.day}/
              {certificateData.birthday.month}/{certificateData.birthday.year}
            </p>
            <p>
              <strong>Delivery Date:</strong>{" "}
              {certificateData.delivery_date.day}/
              {certificateData.delivery_date.month}/
              {certificateData.delivery_date.year}
            </p>
            <p>
              <strong>Serial ID:</strong> {certificateData.serial_id}
            </p>
            <p>
              <strong>Security Code:</strong> {certificateData.security_code}
            </p>
            <p>
              <strong>More Info:</strong> {certificateData.more_info}
            </p>
            <p>
              <strong>Original Data:</strong>{" "}
              {certificateData.original_data_sha256}
            </p>
            <p>
              <strong>Original Image:</strong>{" "}
              {certificateData.original_image_sha256}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
