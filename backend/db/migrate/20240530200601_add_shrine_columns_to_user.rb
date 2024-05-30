class AddShrineColumnsToUser < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :profile_image, :binary
    remove_column :users, :header_image, :binary
    add_column :users, :profile_image_data, :text
    add_column :users, :header_image_data, :text
  end
end
