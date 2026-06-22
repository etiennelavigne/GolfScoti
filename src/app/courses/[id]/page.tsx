import { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES } from "@/data/courses";
import { CourseDetailClient } from "./course-detail-client";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return COURSES.map((course) => ({ id: course.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const course = COURSES.find((c) => c.id === id);
    if (!course) return {};

    const title = `${course.name} — Green Fees, Info & Booking | GolfScoti`;
    const description = `Play ${course.name} in Scotland. Green fees from £${course.greenFee.min}${course.established ? `, established ${course.established}` : ""}. ${course.description.slice(0, 120)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            url: `https://golf-scoti.vercel.app/courses/${id}`,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function CourseDetailPage({ params }: Props) {
    const { id } = await params;
    const course = COURSES.find((c) => c.id === id);
    if (!course) notFound();

    const nearby = COURSES.filter(
        (c) => c.id !== course.id && Math.abs((c.location.distanceFromStAndrews ?? 0) - (course.location.distanceFromStAndrews ?? 0)) < 30
    ).slice(0, 3);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SportsActivityLocation",
        name: course.name,
        description: course.description,
        address: {
            "@type": "PostalAddress",
            streetAddress: course.location.address,
            addressCountry: "GB",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: course.location.lat,
            longitude: course.location.lng,
        },
        ...(course.established && { foundingDate: String(course.established) }),
        url: course.bookingLink,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CourseDetailClient course={course} nearby={nearby} />
        </>
    );
}
