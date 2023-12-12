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
  // designation: { ...commonPermissions, hrAdmin: allPermissions },
  designation: commonPermissions,
  department: commonPermissions,
  project: commonPermissions,
  users: commonPermissions,
  event: commonPermissions,
  todo: allPermissions,
  leaveType: commonPermissions,
  resourceDeactivated: commonPermissions,
  officeResource: commonPermissions,
  employeeResource: commonPermissions,
  holiday: commonPermissions,
};

export default PermissionHierarchy;