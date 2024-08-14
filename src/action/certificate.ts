"use server";

import prisma from "@/lib/prisma";

export async function CreateCertificate(
  certPublicKey: string,
  ownerPublicKey: string
) {
  try {
    const certificate = await prisma.certificate.create({
      data: {
        certPublicKey,
        ownerPublicKey,
      },
    });

    if (!certificate) {
      throw new Error("Failed to create certificate");
    }

    return certificate;
  } catch (error) {
    console.error("Error creating certificate:", error);
    throw new Error("An error occurred while creating the certificate");
  }
}

export async function GetCertificatesByOwner(ownerPublicKey: string) {
  try {
    const certificates = await prisma.certificate.findMany({
      where: {
        ownerPublicKey,
      },
    });

    return certificates;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    throw new Error("An error occurred while fetching the certificates");
  }
}
