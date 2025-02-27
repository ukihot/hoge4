import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

const FileUploader = () => {
  return (
    <div className="grid w-full max-w-sm items-center">
      <Label htmlFor="hippo-data">Data File</Label>
      <Input id="hippo-data" type="file" />
    </div>
  );
};

export default FileUploader;
