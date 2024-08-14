"use client";
import { useEffect, useState } from "react";
import { CertificateType } from "@/schemas/form";
import React from "react";

export default function CertificateDetails({
  params,
}: {
  params: {
    certificate_public_key: string;
  };
}) {
  const { certificate_public_key } = params;
  console.log(certificate_public_key);
  const [certificateData, setCertificateData] =
    useState<CertificateType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //localhost:8000/get-certificate-data?cert_public_key=FHKZCEfSivvadB19bDSkED5sb26Z1BTFmKgaJ6poWNPD
  http: useEffect(() => {
    const fetchCertificateData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/get-certificate-data?cert_public_key=${certificate_public_key}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch certificate data");
        }
        const data = await response.json();
        setCertificateData(data.data);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateData();
  }, [certificate_public_key]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 flex items-center justify-center">
      {certificateData ? (
        <div className=" p-10 rounded-lg w-2/3 bg-secondary">
          <h3 className="text-2xl font-bold mb-4">Certificate Details:</h3>
          <p>
            <strong>Full Name:</strong> {certificateData.fullname}
          </p>
          <p>
            <strong>Birthday:</strong> {certificateData.birthday.day}/
            {certificateData.birthday.month}/{certificateData.birthday.year}
          </p>
          <p>
            <strong>Delivery Date:</strong> {certificateData.delivery_date.day}/
            {certificateData.delivery_date.month}/
            {certificateData.delivery_date.year}
          </p>
          <p>
            <strong>Sender:</strong> {certificateData.sender}
          </p>
          <p>
            <strong>Owner:</strong> {certificateData.owner}
          </p>
          <p>
            <strong>Serial ID:</strong> {certificateData.serial_id}
          </p>
          <p>
            <strong>Security Code:</strong> {certificateData.security_code}
          </p>
          <p>
            <strong>More Info:</strong> {certificateData.more_info || "N/A"}
          </p>
          <p>
            <strong>Original Data SHA-256:</strong>{" "}
            {certificateData.original_data_sha256}
          </p>
          <p>
            <strong>Original Image SHA-256:</strong>{" "}
            {certificateData.original_image_sha256}
          </p>
        </div>
      ) : (
        <p>Certificate not found.</p>
      )}
    </div>
  );
}
