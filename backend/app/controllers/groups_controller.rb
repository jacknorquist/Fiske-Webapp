class GroupsController < ApplicationController
    before_action :set_group, only: [:show, :edit, :update, :destroy, :join, :leave]

    def index
      render json: { groups: Group.all}, status: :ok
    end

    def show
        render json: { group: @group}, status: :ok
    end

    def create


      @group = Group.new(group_params)

      # if params[:header_image].present?
      #   @group.header_image = params[:header_image]
      # end

      # if params[:images].present?
      #   params[:images].each do |image|
      #     @group.images.attach(image)
      #   end
      # end

      if @group.save
        render json: { group: group_json(@group)}, status: :created
      else
        render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def edit
    end

    def update
      unless authorized
        return render json: { errors: "Not Authorized" }, status: :unauthorized
      end

      if @group.update(group_params)
        render json: { group: group_json(@group)}, status: :ok
      else
        render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      unless authorized
        return render json: { errors: "Not Authorized" }, status: :unauthorized
      end

      if @group.destroy
        render json: { message: "Group Deleted" }, status: :ok
      else
        render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def join
        membership = Membership.new(group: @group, user: @current_user)

        if membership.save
          render json: { message: "Joined group successfully" }, status: :created
        else
          render json: { error: 'Failed to join group' }, status: :unprocessable_entity
        end
    end

    def leave
        if @group.members.delete(@current_user)
          render json: { message: "Left group successfully" }, status: :ok
        else
          render json: { error: 'Failed to leave group' }, status: :unprocessable_entity
        end
      end

    private

    def set_group
      @group = Group.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'Group not found' }, status: :not_found
    end


    def group_params
      params.permit(:name, :fish_species, :area, :header_image).merge(admin_id: @current_user.id)

    end


    def group_json(group)
      group_json = group.as_json(only: [:id, :admin_id, :name, :fish_species, :area])

      if group.header_image
        group_json[:header_image_url] = group.header_image_url
      end

      if group.images
        user_json[:group_images_url] = group.group_images_url
      end

      group_json
    end
    def authorized
      @group.admin_id == @current_user.id
    end
  end