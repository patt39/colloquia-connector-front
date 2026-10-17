import { Search, XIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

interface Props {
  onChange?: any;
  className?: string;
  placeholder: string;
}

export const SearchInput = ({ onChange, className, placeholder }: Props) => {
  const { search, setSearch } = useInputState();

  return (
    <InputGroup>
      <InputGroupInput
        type="text"
        className={className}
        onChange={onChange}
        placeholder={placeholder}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {search && (
        <InputGroupAddon align="inline-end">
          <XIcon
            className="size-4 opacity-50 cursor-pointer "
            onClick={() => setSearch("")}
          />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};

function useInputState(): {
  search: string;
  setSearch: (value: string) => void;
} {
  throw new Error("Function not implemented.");
}
// export const SearchInput = ({ onChange, className, placeholder }: Props) => {
//   const [search, setSearch] = useState('');

//   const handleChange = (e: any) => {
//     const value = e.target.value;
//     setSearch(value);
//     onChange?.(value); // notify parent if provided
//   };

//   const clearSearch = () => {
//     setSearch('');
//     onChange?.(''); // reset parent
//   };

//   return (
//     <>
//       <InputGroup>
//         <InputGroupInput
//           type="text"
//           value={search}
//           onChange={handleChange}
//           placeholder={placeholder}
//           className="w-40"
//         />
//         <InputGroupAddon>
//           <Search className="text-muted-foreground" />
//         </InputGroupAddon>

//         {search && (
//           <InputGroupAddon align="inline-end">
//             <XIcon
//               className="size-4 opacity-50 cursor-pointer hover:opacity-100 transition"
//               onClick={clearSearch}
//             />
//           </InputGroupAddon>
//         )}
//       </InputGroup>
//     </>
//   );
// };
