// supabase
import supabase from "./supabase";

// constants
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new error("unable to load cabins");
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin.image === "string"
      ? newCabin.image?.startsWith(supabaseUrl)
      : false;

  // 1. Image path creation
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.imagePath || newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // 2. Cabin Creation/Edit

  if (!id) {
    // A> CREATE
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  if (id) {
    // B > EDIT
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created").select().single();
  }

  // 3. Image Upload (skip for the duplicates)
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 4. Delete Cabin If Storage Error
  if (storageError) {
    const { data, error } = await supabase
      .from("cabins")
      .delete()
      .eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded & cabin could not be created"
    );
  }

  return data;
}

export async function createCabin() {}
