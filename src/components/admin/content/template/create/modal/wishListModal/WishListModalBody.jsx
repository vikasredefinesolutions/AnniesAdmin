import { useFormikContext } from "formik";

const WishListModalBody = () => {
  const { values, setFieldValue } = useFormikContext()
  return (
    <>
      <input
        className="w-full"
        type="text"
        value={values?.componentNameTextBox}
        onChange={(event) => setFieldValue('componentNameTextBox', event.target.value)}
        name="componentNameTextBox"
        placeholder="Component Name"
      />
    </>
  );
};

export default WishListModalBody;
