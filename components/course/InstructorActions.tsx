import { Button } from "@/components/ui/button";

interface Props {
  handleDeleteAction: () => void;
}

const InstructorActions = ({ handleDeleteAction }: Props) => (
  <Button type="button" variant="destructive" onClick={handleDeleteAction}>
    Delete the course
  </Button>
);

export { InstructorActions };
