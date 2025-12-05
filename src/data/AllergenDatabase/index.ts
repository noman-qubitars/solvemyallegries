interface AllergenDatabaseModalFormField {
    label: string;
    placeholder?: string;
    image?: string;
    type?: "text";
  }
  
  interface AllergenDatabaseModalFormSection {
    section: string;
    fields: AllergenDatabaseModalFormField[];
  }
  
  export const AllergenDatabaseModalData: AllergenDatabaseModalFormSection[] = [
    {
      section: "Symptom Details",
      fields: [
        { label: "Symptom Name", image: "/images/Educational/edit.svg", placeholder: "Enter Allergen Name" },
        {
          label: "Common Symptoms",
          placeholder: "Write common symptoms",
        },
      ],
    },
  ];