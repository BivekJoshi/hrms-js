import FormModal from '../../Modal/FormModal';
import { ActivatedLeaveTypeFields, DeactivatedLeaveTypeFields } from './ActivatedLeaveTypeFields';

export const ActivatedLeaveTypeModal = ({
    open,
    handleCloseModal,
    data,
    title,
  }) => {
    return (
      <div>
        <FormModal
          title={title}
          open={open}
          onClose={handleCloseModal}
          formComponent={
            <ActivatedLeaveTypeFields
              onClose={handleCloseModal}
              data={data}
            />
          }
        />
      </div>
    );
  };

  export const DeactivatedLeaveTypeModal = ({
    open,
    handleCloseModal,
    data,
    title,
  }) => {
    return (
      <div>
        <FormModal
          title={title}
          open={open}
          onClose={handleCloseModal}
          formComponent={
            <DeactivatedLeaveTypeFields
              onClose={handleCloseModal}
              data={data}
            />
          }
        />
      </div>
    );
  };