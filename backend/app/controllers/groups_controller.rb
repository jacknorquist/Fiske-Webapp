class GroupsController < ApplicationController
    before_action :set_group, only: [:show, :edit, :update, :destroy, :join, :leave]

    def index
      render json: { groups: Group.all}, status: :ok
    end

    def show
        render json: { group: @group}, status: :ok
    end

    def create

      group_params = params.permit(:name, :description, :admin_id)

      puts params, 'hhhhhhhhhhhhhhhhhhh'

      @group = Group.new(group_params)


      if params[:header_image].present?
        @group.header_image = params[:header_image]
      end

      images_params.each do |image|
        @group.images.attach(image)
      end

      # if params[:images].present?
      #   @group.images = params[:images]
      # end

      if @group.save
        render json: { group: @group}, status: :created
      else
        render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def edit
    end

    def update
        if @group.admin_id == @current_user.id
            if @group.update(group_params_without_admin_id)
                render json: { group: @group}, status: :ok
            else
                render json: { errors: @group.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { errors: "Not Authorized" }, status: :unauthorized
        end
    end

    def destroy
        if @group.admin_id == @current_user.id
            if @group.destroy
                render json: { message: "Group Deleted" }, status: :ok
            else
                render json: { errors: @group.errors.full_messages }, status: :unprocessable_entityed
            end
        else
            render json: { errors: "Not Authorized" }, status: :unauthorized
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
      params.permit(:name, :fish_species, :admin_id, :area, images: [])
    end

    def group_params_without_admin_id
        group_params.except(:admin_id)
    end
  end