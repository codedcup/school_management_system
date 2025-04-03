import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import FrontendFourm from '../../../components/FrontendForm';

const ShowClasses = () => {
  const dispatch = useDispatch();
  const { sclassesList, loading, error } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);

  const adminID = currentUser?._id;

  useEffect(() => {
    if (adminID) {
      dispatch(getAllSclasses(adminID, "Sclass"));
    }
  }, [adminID, dispatch]);

  const buttonData = [
    { name: "Add New Class", link: "/Admin/addclass" },
    { name: "Add in Bulk", link: "/Admin/addclass/bulk" }
  ];

  return (
    <FrontendFourm
      title="Classes"
      dataList={sclassesList}
      loading={loading}
      error={error}
      buttonData={buttonData}
      viewPath="/Admin/classes/class"
      editPath="/Admin/editclass"
      nameKey="sclassName"
    />
  );
};

export default ShowClasses;

