class AddImagesToPosts < ActiveRecord::Migration[6.0]
  def change
    # remove_column :posts, :images_data
    add_column :groups, :images_data, :text, array: true
  end
end
