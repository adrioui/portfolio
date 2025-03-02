
import { UserProfile } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="outline" 
        onClick={() => navigate(-1)} 
        className="mb-6"
      >
        ← Back
      </Button>
      
      <div className="bg-card rounded-lg p-4 border border-border/60">
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;
