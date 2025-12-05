import React from 'react';
import Layout from '@/components/Layout';
import CaseStudy from '@/components/CaseStudy';
import { casestudypage } from '@/data/Landing';

const CaseStudyPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {

    const { id } = await params;

    const property = casestudypage.find((pro) => pro.id === id);

    return (
        <Layout>
            {property ? (
                <CaseStudy key={property.id} property={property} />
            ) : (
                <div>Case study not found</div>
            )}
        </Layout>
    )
}

export default CaseStudyPage;