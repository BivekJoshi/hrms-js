// const PermissionHierarchy = {
//   company: {
//     superAdmin: { canEdit: true, canAdd: true, canDelete: true, canView: true },
//     admin: { canEdit: true, canAdd: true, canDelete: true, canView: true },
//     manager: { canEdit: true, canAdd: true, canDelete: true, canView: true },
//     hrAdmin: { canView: true },
//     hrClerk: { canView: true },
//     employee: { canView: true },
//   },
//   designation: {
//     superAdmin: { canEdit: true, canAdd: true, canDelete: true, canView: true },
//     admin: { canEdit: true, canAdd: true, canDelete: true, canView: true },
//     manager: { canEdit: true, canAdd: true, canDelete: true, canView: true },
//     hrAdmin: { canEdit: true, canAdd: true, canDelete: true, canView: true },
//     hrClerk: { canView: true },
//     employee: { canView: true },
//   },
//   department: {
//     superAdmin: { canEdit: true, canAdd: true, canDelete: true, canView: true },
//     admin: { canEdit: true, canAdd: true, canDelete: true, canView: true },
//     manager: { canEdit: true, canAdd: true, canDelete: true, canView: true },
//     hrAdmin: { canView: true },
//     hrClerk: { canView: true },
//     employee: { canView: true },
//   },
//   project: {
//     superAdmin: { canEdit: true, canAdd: true, canDelete: true, canView: true },
//     admin: { canEdit: true, canAdd: true, canDelete: true, canView: true },
//     manager: { canEdit: true, canAdd: true, canDelete: true, canView: true },
//     hrAdmin: { canView: true },
//     hrClerk: { canView: false },
//     employee: { canView: true },
//   },
// };

// export default PermissionHierarchy;

const allPermissions = {
  canEdit: true,
  canAdd: true,
  canDelete: true,
  canView: true,
};

const commonPermissions = {
  superAdmin: allPermissions,
  admin: allPermissions,
  manager: allPermissions,
  hrAdmin: { canView: true },
  hrClerk: { canView: true },
  employee: { canView: true },
};

const PermissionHierarchy = {
  company: commonPermissions,
  designation: { ...commonPermissions, hrAdmin: allPermissions },
  department: commonPermissions,
  project: commonPermissions,
  users: commonPermissions,
  event: commonPermissions,
  todo: allPermissions,
  leaveType:commonPermissions,
};

export default PermissionHierarchy;