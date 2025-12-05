export interface EducationalBtnItem {
  label: string;
  number: string;
}

export const EducationalBtnData: EducationalBtnItem[] = [
  {
    label: "Upload",
    number: "(8)",
  },
  {
    label: "Drafts",
    number: "(4)",
  }
];

interface EducationalVideosModalFormField {
  label: string;
  placeholder?: string;
  image?: string;
  type?: "text";
}

interface EducationalVideosModalFormSection {
  section: string;
  fields: EducationalVideosModalFormField[];
}

export const EducationalVideosModalData: EducationalVideosModalFormSection[] = [
  {
    section: "Upload Video",
    fields: [
      { label: "Title", image: "/images/Educational/edit.svg", placeholder: "Enter Video Title" },
      {
        label: "Description",
        placeholder: "Add Video Description",
      },
      { label: "Upload Video"},
    ],
  },
];

export interface EducationalOptionsBtnItem {
  image: string;
  label: string;
}

export const EducationalOptionsBtnData: EducationalOptionsBtnItem[] = [
  {
    image: "/images/Educational/edits.svg",
    label: "Edit"
  },
  {
    image: "/images/Educational/delete.svg",
    label: "Delete"
  }
];

interface SessionVideosModalFormField {
  label: string;
  placeholder?: string;
  image?: string;
  type?: "text";
}

interface SessionVideosModalFormSection {
  section: string;
  fields: SessionVideosModalFormField[];
}

export const SessionVideosModalData: SessionVideosModalFormSection[] = [
  {
    section: "Upload Video",
    fields: [
      { label: "Title", image: "/images/Educational/edit.svg", placeholder: "Enter Video Title" },
      {
        label: "Description",
        placeholder: "Add Video Description",
      },
      {
        label: "Symptoms Tags",
        placeholder: "Enter Symptoms Tags",
      },
      { label: "Upload Video"},
    ],
  },
];