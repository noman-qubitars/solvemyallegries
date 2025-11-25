import UserManagementDetail from "@/components/UserManagement/Details";

const UserManagementDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {

    const { id } = await params;

    return (
        <div>
            <UserManagementDetail id={id} />
        </div>
    );
};

export default UserManagementDetailsPage;