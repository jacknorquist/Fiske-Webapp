namespace :db do
    desc "Delete all records from all tables"
    task delete_data: :environment do
      ActiveRecord::Base.descendants.each(&:delete_all)
      puts "All records deleted!"
    end
  end