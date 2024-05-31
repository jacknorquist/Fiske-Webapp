class ReplaceActiveStorageWithShrineForGroups < ActiveRecord::Migration[6.0]
  def change
    remove_column :groups, :header_image, :string
    remove_column :groups, :images, :string, array: true, default: []

    add_column :groups, :header_image_data, :text
    add_column :groups, :images_data, :text, array: true
  end
end
