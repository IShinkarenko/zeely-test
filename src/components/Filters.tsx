import { Select } from "./ui/select";

const GENDER_OPTIONS = [
  { value: "all", label: "All Genders" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const AGE_OPTIONS = [
  { value: "all", label: "All Ages" },
  { value: "20-25", label: "20-25" },
  { value: "26-30", label: "26-30" },
  { value: "31-35", label: "31-35" },
];

const POSE_OPTIONS = [
  { value: "all", label: "All Poses" },
  { value: "standing", label: "Standing" },
  { value: "sitting", label: "Sitting" },
];

export function Filters() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-[26px] leading-[120%] tracking-[0%]">
        Choose an AI avatar
      </h2>

      <div className="flex items-center gap-4 mb-6">
        <Select
          options={GENDER_OPTIONS}
          defaultValue="all"
          placeholder="Gender"
          size="sm"
        />
        <Select
          options={AGE_OPTIONS}
          defaultValue="all"
          placeholder="Age"
          size="sm"
        />
        <Select
          options={POSE_OPTIONS}
          defaultValue="all"
          placeholder="Pose"
          size="sm"
        />
      </div>
    </div>
  );
}
