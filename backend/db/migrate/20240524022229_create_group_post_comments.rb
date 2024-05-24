class CreateGroupPostComments < ActiveRecord::Migration[6.0]
  def change
    create_table :group_post_comments do |t|
      t.references :post, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.text :content, null: false, limit: 200
      t.timestamps
    end
  end
end
