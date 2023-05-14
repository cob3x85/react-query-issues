import { FC } from "react";
import { useLabels } from "../../hooks/useLabels";
import { LoadingIcon } from "../../shared/components/LoadingIcon";


interface Props {
  selectedLabels: string[];
  onLabelChange: (labelName: string) => void;
}
export const LabelPicker: FC<Props> = ({selectedLabels, onLabelChange}) => {
  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) {
    return (
      <LoadingIcon />
    )
  }
  return (
    <>
      {
        labelsQuery.data?.map(label => (
          <span
            className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name)? 'label-active': ''}`}
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
            onClick={()=> onLabelChange(label.name)}
          >
            {label.name}
          </span>
        ))
      }


    </>
  )
}
