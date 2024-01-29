import { Controller } from 'react-hook-form';
import Select from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

interface CompSelectProps {
  control: any;
  name: string;
  options: OptionType[];
}

export const CompSelect: React.FC<CompSelectProps> = ({ control, name, options }) => { //chato p krl
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          onChange={(option) => field.onChange(option?.value)}
          value={options.find(option => option.value === field.value)}
        />
      )}
    />
  );
};