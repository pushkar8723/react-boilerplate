/**
 * Utility class for functions used across application.
 */
export default class Common {
    /**
     * Checks if user is authorized for the given role.
     *
     * @param {string}      requiredRole
     * @param {string[]}    userRoles
     * @returns {boolean}
     */
    public static isAuthorized(requiredRole: string, userRoles: string[]): boolean {
        return (userRoles.indexOf(requiredRole) !== -1);
    }
}
