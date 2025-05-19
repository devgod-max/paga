import { supabase } from "../supabaseClient"; // Import supabase client

// Login function
export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Handle login error
    if (error) throw error;

    const user = data.user;

    // Check if the user's email is confirmed
    if (user && user.email_confirmed_at) {
      console.log("User logged in successfully:", user);
      return user;
    } else {
      console.log("Email not confirmed. Please verify your email.");
      alert(
        "Email not verified. Please check your inbox for a verification link."
      );
      return null;
    }
  } catch (error) {
    console.error("Login error:", error.message);
    alert("Error during login. Please try again.");
    throw error;
  }
};

// Signup function
export const signupUser = async (email, username, role, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: username,
          role,
        },
      },
    });

    if (error) throw error;

    const user = data.user;

    if (user?.id) {
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert([
          {
            auth_id: user.id, // Link to auth.users
            name: username,
            email,
            role,
            password,
          },
        ]);

      if (insertError) {
        console.error(
          "Error inserting user into the users table:",
          insertError
        );
        throw insertError; // Optional: Rethrow to propagate the error
      } else {
        console.log("User inserted into the users table:", insertData);
      }

      console.log("User created successfully.");
      console.log(data.user);
      return user;
    }

    return null;
  } catch (error) {
    console.error("Signup error:", error.message);
    alert("Error during signup. Please try again.");
    throw error;
  }
};
